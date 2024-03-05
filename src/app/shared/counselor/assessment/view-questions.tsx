"use client";

import FormikInput from "@/components/ui/form/input";
import Spinner from "@/components/ui/spinner";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import useDynamicMutation from "@/react-query/usePostData";
import {
  assessmentQuestionsType,
  assessmentQuestionschema,
} from "@/validations/assessment";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Button, Title } from "rizzui";
import { toast } from "sonner";
import { useModal } from "../../modal-views/use-modal";
import EditItem from "./editItem";

const ViewQuestion = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "FormData" });

  const postMutation = useDynamicMutation();

  const [optionErrors, setOptionErrors] = useState<null | string>(null);

  const questionsData = useFetchData(
    [queryKeys.getAssessmentCategoryQuestions + categoryId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/self-assessment-questions/${categoryId}`,
    headers
  );

  if (
    questionsData?.isFetching ||
    questionsData?.isLoading ||
    questionsData.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }
  const Questions: any[] = questionsData.data.data;

  const initialValues: assessmentQuestionsType = {
    questions: Questions.flatMap((question) => {
      const options: any[] = question.options;

      return {
        question_text: question.question_text.english,
        options: [
          ...options.flatMap((option) => {
            return option.choice_text.english;
          }),
        ],
      };
    }),
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
              {Array.from({
                length: questionsData.data.data.length,
              }).map((_, index) => (
                <section
                  key={index + "--assessment-questions--"}
                  className="border my-4 p-4 rounded-xl"
                >
                  <p className="mb-8 px-6 py-1 font-medium rounded-full text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-fit ">{`Question ${
                    index + 1
                  }`}</p>

                  <div className="flex">
                    <FormikInput
                      name={`questions[${index}].question_text`}
                      label=""
                      placeholder="Write Your question here"
                      color="primary"
                      className=" border-b border-[#e2e2e2]"
                      inputClassName="border-none text-lg"
                      disabled
                    />
                    <button
                      onClick={() => {
                        openModal({
                          view: (
                            <EditItem
                              item={questionsData.data.data[index]}
                              type="Question"
                              categoryId={categoryId}
                            />
                          ),
                          customSize: "550px",
                        });
                      }}
                      type="button"
                      className="w-8 h-8 border rounded-lg flex justify-center items-center ml-4"
                    >
                      <CiEdit size={20} />
                    </button>
                  </div>
                  {Array.from({ length: 5 }).map((_, index_two) => (
                    <div
                      className="flex"
                      key={
                        index + "--assessment-questions-options--" + index_two
                      }
                    >
                      <FormikInput
                        name={`questions[${index}].options[${index_two}]`}
                        label=""
                        placeholder={`Write your option ${index_two + 1}`}
                        color="primary"
                        className=" border-b border-[#e2e2e2]"
                        inputClassName="border-none px-8 py-6 font-light"
                        disabled
                      />
                      {questionsData.data.data[index].options[index_two] ? (
                        <button
                          type="button"
                          className="w-8 h-8 border rounded-lg flex justify-center items-center ml-4"
                          onClick={() => {
                            openModal({
                              view: (
                                <EditItem
                                  item={
                                    questionsData.data.data[index].options[
                                      index_two
                                    ]
                                  }
                                  type="Option"
                                  categoryId={categoryId}
                                />
                              ),
                              customSize: "550px",
                            });
                          }}
                        >
                          <CiEdit size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="w-8 h-8 opacity-0 border rounded-lg flex justify-center items-center ml-4"
                        />
                      )}
                    </div>
                  ))}
                </section>
              ))}

              {optionErrors && (
                <p className="text-red-400 text-sm">*{optionErrors}</p>
              )}

              <div className="flex items-end justify-end w-full mt-4">
                <Button
                  isLoading={postMutation.isPending}
                  color="primary"
                  size="lg"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default ViewQuestion;
