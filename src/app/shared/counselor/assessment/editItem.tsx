"use client";
import * as Yup from "yup";

import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { Form, Formik } from "formik";
import React from "react";
import { ActionIcon, Button, Title } from "rizzui";
import { PiXBold } from "react-icons/pi";
import { useModal } from "../../modal-views/use-modal";
import { toast } from "sonner";
import { queryKeys } from "@/react-query/query-keys";
import { useQueryClient } from "@tanstack/react-query";

const EditItem = ({
  item,
  type,
  categoryId,
}: {
  item: any;
  type: "Question" | "Option";
  categoryId: string;
}) => {
  const { closeModal } = useModal();
  console.log(item);

  const headers = useGetHeaders({ type: "FormData" });

  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const questionSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
  });

  const optionSchema = Yup.object().shape({
    choice_text: Yup.string().required("Choice text is required"),
  });

  const updateItem = async (values: any) => {
    try {
      const valToSendQuestion = {
        question: values.question,
      };
      const valToSendOptions = {
        choice_text: values.choice_text,
      };
      await postMutation.mutateAsync({
        url:
          type === "Question"
            ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/update-question/${item.id}`
            : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/update-question-option/${item.id}`,
        method: "POST",
        headers,
        body: type === "Question" ? valToSendQuestion : valToSendOptions,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAssessmentCategoryQuestions + categoryId],
          });

          toast.success("Item  updated Successfully");
          closeModal();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    question: type === "Question" ? item.question_text.english : "",
  };

  const initialValuesOptions = {
    choice_text: type === "Option" ? item.choice_text.english : "",
  };

  return (
    <article className="p-6">
      <div className="flex justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Title as="h4">Edit Item</Title>

      <Formik
        initialValues={type === "Option" ? initialValuesOptions : initialValues}
        validationSchema={type === "Option" ? optionSchema : questionSchema}
        onSubmit={(values: { question: string } | { choice_text: string }) => {
          console.log(values);
          updateItem(values);
        }}
      >
        {({}) => {
          return (
            <Form>
              <FormikInput
                name={type === "Option" ? "choice_text" : "question"}
                label=""
                placeholder={`Write your ...`}
                color="primary"
                className=" border-b border-[#e2e2e2]"
                inputClassName="border-none px-8 py-6 font-light"
              />

              <div className="flex items-end justify-end w-full mt-4">
                <Button
                  isLoading={postMutation.isPending}
                  color="primary"
                  size="lg"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default EditItem;
