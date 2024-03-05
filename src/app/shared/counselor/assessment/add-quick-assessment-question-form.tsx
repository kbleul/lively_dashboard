"use client";

import FormikInput from "@/components/ui/form/input";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import {
  assessmentQuestionType,
  singleAssessmentQuestionSchema,
} from "@/validations/assessment";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ActionIcon, Button, Title } from "rizzui";
import { toast } from "sonner";
import { useModal } from "../../modal-views/use-modal";
import { PiXBold } from "react-icons/pi";

const AddQuestionForm = ({
  prevQuestions,
}: {
  prevQuestions: assessmentQuestionType[];
}) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const headers = useGetHeaders({ type: "FormData" });

  const postMutation = useDynamicMutation();

  const [optionErrors, setOptionErrors] = useState<null | string>(null);

  const initialValues: assessmentQuestionType = {
    question_text: "",
    options: [],
  };

  const createPQuestionsHandeler = async (values: assessmentQuestionType) => {
    setOptionErrors(null);

    const islessthan = values.options.length < 2;

    if (islessthan) {
      setOptionErrors("There need to be atleast 2 options for each question.");
      return;
    }

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/quick-self-assessment-questions`,
        method: "POST",
        headers,
        body: {
          questions: [values, ...prevQuestions],
        },
        onSuccess: (res) => {
          router.push(routes.counselor["quick-self-assessment"]);

          toast.success("Questions addedd successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="p-8">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add question
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={singleAssessmentQuestionSchema}
        onSubmit={(values: assessmentQuestionType) => {
          console.log(values);
          createPQuestionsHandeler(values);
        }}
      >
        {({}) => {
          return (
            <Form>
              <FormikInput
                name={`question_text`}
                label=""
                placeholder="Write Your question here"
                color="primary"
                className=" border-b border-[#e2e2e2]"
                inputClassName="border-none"
              />
              {Array.from({ length: 10 }).map((_, index) => (
                <FormikInput
                  key={"--assessment-questions-options--" + index}
                  name={`options[${index}]`}
                  label=""
                  placeholder={`Write your option ${index + 1}`}
                  color="primary"
                  className=" border-b border-[#e2e2e2] mx-2"
                  inputClassName="border-none  px-4 py-6 font-light"
                />
              ))}

              {optionErrors && (
                <p className="text-red-400 px-4 text-sm">*{optionErrors}</p>
              )}

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

export default AddQuestionForm;
