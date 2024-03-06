"use client";

import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Button, Title } from "rizzui";
import {
  assessmentQuestionsType,
  assessmentQuestionschema,
} from "@/validations/assessment";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import EditItem from "./editItem";
import { CiEdit } from "react-icons/ci";
import { routes } from "@/config/routes";
import AddQuestionForm from "./add-quick-assessment-question-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";

const QuickAssessment = () => {
  const router = useRouter();

  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const [optionErrors, setOptionErrors] = useState<null | string>(null);

  const assessmentData = useFetchData(
    [queryKeys.getQuickAssessmentQuestions],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/quick-self-assessment-questions`,
    headers
  );

  if (assessmentData.isPending || assessmentData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const createQuestionsHandeler = async (values: assessmentQuestionsType) => {
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
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/quick-self-assessment-questions`,
        method: "POST",
        headers,
        body: {
          ...values,
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getQuickAssessmentQuestions],
          });

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

  const QuickAssessmentQuestions: any[] = assessmentData?.data?.data;

  const initialValues: assessmentQuestionsType = {
    questions: QuickAssessmentQuestions.flatMap((question) => {
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

  const deleteMutation = async (questionId: string) => {
    const questions = QuickAssessmentQuestions.flatMap((question) => {
      if (question.id !== questionId) {
        const options: any[] = question.options;

        return {
          question_text: question.question_text.english,
          options: [
            ...options.flatMap((option) => {
              return option.choice_text.english;
            }),
          ],
        };
      }
    }).filter((question) => question);

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/quick-self-assessment-questions`,
        method: "POST",
        headers,
        body: {
          questions,
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getQuickAssessmentQuestions],
          });

          router.push(routes.counselor["quick-self-assessment"]);

          toast.success("Questions deleted successfully");
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
      <div className="flex justify-end mb-6">
        <Button
          size="lg"
          color="primary"
          className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
          onClick={() =>
            openModal({
              view: (
                <AddQuestionForm
                  prevQuestions={QuickAssessmentQuestions.flatMap(
                    (question) => {
                      const options: any[] = question.options;

                      return {
                        question_text: question.question_text.english,
                        options: [
                          ...options.flatMap((option) => {
                            return option.choice_text.english;
                          }),
                        ],
                      };
                    }
                  )}
                />
              ),
            })
          }
        >
          Add Questions
        </Button>
      </div>

      {QuickAssessmentQuestions.length === 0 ? (
        <Title as="h4" className="w-full text-center mt-10">
          No questions added yet!
        </Title>
      ) : (
        <article>
          <Formik
            initialValues={initialValues}
            validationSchema={assessmentQuestionschema}
            onSubmit={(values: assessmentQuestionsType) => {
              createQuestionsHandeler(values);
            }}
          >
            {({}) => {
              return (
                <Form>
                  {Array.from({
                    length: QuickAssessmentQuestions.length,
                  }).map((_, index) => (
                    <section
                      key={index + "--assessment-questions--"}
                      className="border my-4 p-4 rounded-xl"
                    >
                      <div className="mb-8 flex justify-between items-center">
                        <p className=" px-6 py-1 font-medium rounded-full text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-fit ">{`Question ${
                          index + 1
                        }`}</p>
                        <button
                          className="mr-4"
                          disabled={postMutation.isPending}
                          type="button"
                          onClick={() =>
                            deleteMutation(QuickAssessmentQuestions[index].id)
                          }
                        >
                          <RiDeleteBinLine
                            size={24}
                            color={"#f24f27"}
                            className={postMutation.isPending ? "hidden" : ""}
                          />
                        </button>
                      </div>

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
                                  item={QuickAssessmentQuestions[index]}
                                  type="Question"
                                  categoryId={"categoryId"}
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
                            index +
                            "--assessment-questions-options--" +
                            index_two
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
                          {QuickAssessmentQuestions[index].options[
                            index_two
                          ] ? (
                            <button
                              type="button"
                              className="w-8 h-8 border rounded-lg flex justify-center items-center ml-4"
                              onClick={() => {
                                openModal({
                                  view: (
                                    <EditItem
                                      item={
                                        QuickAssessmentQuestions[index].options[
                                          index_two
                                        ]
                                      }
                                      type="Option"
                                      categoryId={"categoryId"}
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
      )}
    </article>
  );
};

export default QuickAssessment;
