"use client";

import FormikInput from "@/components/ui/form/input";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import {
  assessmentQuestionsType,
  assessmentQuestionschema,
} from "@/validations/assessment";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "rizzui";
import { toast } from "sonner";

const AddQuestionForm = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const headers = useGetHeaders({ type: "FormData" });

  const postMutation = useDynamicMutation();

  const queryClient = useQueryClient();

  const [optionErrors, setOptionErrors] = useState<null | string>(null);

  const initialValues: assessmentQuestionsType = {
    questions: Array.from({ length: 5 }, () => ({
      question_text: "",
      options: [],
    })),
  };

  const createPQuestionsHandeler = async (values: assessmentQuestionsType) => {
    setOptionErrors(null);

    const islessthan = values.questions.find(
      (question) => question.options.length < 2
    );

    if (islessthan) {
      setOptionErrors("There need to be atleast 2 options for each question.");
      return;
    }

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/self-assessment-questions`,
        method: "POST",
        headers,
        body: {
          ...values,
          category_id: categoryId,
        },
        onSuccess: (res) => {
          router.push(routes.counselor.assessments);

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
    <article>
      <Formik
        initialValues={initialValues}
        validationSchema={assessmentQuestionschema}
        onSubmit={(values: assessmentQuestionsType) => {
          console.log(values);
          createPQuestionsHandeler(values);
        }}
      >
        {({}) => {
          return (
            <Form>
              {Array.from({ length: 5 }).map((_, index) => (
                <section
                  key={index + "--assessment-questions--"}
                  className="border my-4 p-4 rounded-xl"
                >
                  <p className="mb-8 px-6 py-1 font-medium rounded-full text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-fit ">{`Question ${
                    index + 1
                  }`}</p>
                  <FormikInput
                    name={`questions[${index}].question_text`}
                    label=""
                    placeholder="Write Your question here"
                    color="primary"
                    className=" border-b border-[#e2e2e2]"
                    inputClassName="border-none"
                  />
                  {Array.from({ length: 5 }).map((_, index_two) => (
                    <FormikInput
                      key={
                        index + "--assessment-questions-options--" + index_two
                      }
                      name={`questions[${index}].options[${index_two}]`}
                      label=""
                      placeholder={`Write your option ${index_two + 1}`}
                      color="primary"
                      className=" border-b border-[#e2e2e2]"
                      inputClassName="border-none px-8 py-6 font-light"
                    />
                  ))}
                </section>
              ))}

              {optionErrors && (
                <p className="text-red-400 text-sm">*{optionErrors}</p>
              )}

              <div className="flex items-end justify-end w-full">
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
