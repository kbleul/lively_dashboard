"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React from "react";
import * as Yup from "yup";

import { useFetchData } from "@/react-query/useFetchData";
import { FieldArray, Form, Formik } from "formik";
import { Button, Textarea, Title } from "rizzui";
import Spinner from "@/components/ui/spinner";
import useDynamicMutation from "@/react-query/usePostData";
import {
  QuestionnairRadioItems,
  QuestionnairTypes,
} from "@/constants/form-constants";
import RadioSelect from "@/components/ui/form/radio";
import { toast } from "sonner";

type QuestionnairsTypes = {
  responses:
    | {
        question_id: string | null;
        option_id: string | null;
        reason: string | null;
        first_option: string | null;
        type: string | null;
      }[];
};

const ClientIntake = ({ clientId }: { clientId: string }) => {
  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "FormData" });

  const clientIntakeData = useFetchData(
    [],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-expert-intake`,
    headers
  );

  const validateInputes = (values: QuestionnairsTypes) => {
    const hasUnanswerd = values.responses.find(
      (answer) =>
        answer.first_option === null ||
        answer.option_id === null ||
        answer.question_id === null
    );

    if (hasUnanswerd) {
      return false;
    }

    const hasUnanswerdReason = values.responses.find(
      (response) =>
        response.first_option === response.option_id &&
        response.reason === null &&
        response.type === QuestionnairTypes.boolean_reason
    );

    if (hasUnanswerdReason) {
      return false;
    }

    return true;
  };

  const handleSubmitIntake = async (values: QuestionnairsTypes) => {
    if (validateInputes(values)) {
      const valueToSubmit = values.responses.flatMap((response) => {
        if (response.reason) {
          return {
            question_id: response.question_id,
            option_id: response.option_id,
            reason: response.reason,
          };
        } else {
          return {
            question_id: response.question_id,
            option_id: response.option_id,
          };
        }
      });
      try {
        await postMutation.mutateAsync({
          url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-expert-intake-response`,
          method: "POST",
          headers,
          body: { responses: valueToSubmit, user_id: clientId },
          onSuccess: (res) => {
            toast.success("Client intake submitted!");
          },
          onError: (err) => {
            toast.error(err?.response?.data?.data);
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (
    clientIntakeData?.isFetching ||
    clientIntakeData?.isLoading ||
    clientIntakeData.isPending
  ) {
    return (
      <div className="col-span-2 grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const schema = Yup.object().shape({
    response: Yup.array().of(
      Yup.object().shape({
        question_id: Yup.string().required(),
        option_id: Yup.string().required(),
        reason: Yup.string().nullable(),
      })
    ),
  });

  const initialResponses: QuestionnairsTypes["responses"] = Array.from(
    { length: clientIntakeData.data.data.length },
    () => ({
      question_id: null,
      option_id: null,
      reason: null,
      first_option: null,
      type: null,
    })
  );

  const initalValues: QuestionnairsTypes = {
    responses: initialResponses,
  };

  return (
    <article className=" col-span-2 ">
      <Formik
        initialValues={initalValues}
        onSubmit={(values) => {
          handleSubmitIntake(values);
        }}
        validationSchema={schema}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full ">
            <main className="">
              <article className="px-4 rounded-xl shadow-md bg-[#FFF9F2] mb-4 pb-4 md:col-span-8 w-full flex flex-col items-start space-y-1">
                <Title as="h5" className="py-4 text-center">
                  Client Intake
                </Title>
                <FieldArray name="responses">
                  {(data: any) => (
                    <div
                      className=" p-3 mb-4 rounded-md w-full flex flex-col items-start space-y-5 col-span-2
               mt-4"
                    >
                      {clientIntakeData.data.data.map(
                        (question: any, index: number) => (
                          <section key={question.id} className="w-full">
                            <p className="font-semibold mb-4">
                              {question?.question_text?.english}
                            </p>

                            {QuestionnairRadioItems.includes(question.type) && (
                              <div>
                                <RadioSelect
                                  label=""
                                  name={`responses.${index}`}
                                  options={question.options}
                                  onChange={(selectedOptions: any) => {
                                    console.dir(selectedOptions);

                                    setFieldValue(`responses.${index}`, {
                                      question_id: question.id,
                                      option_id: selectedOptions,
                                      reason: null,
                                      first_option: question.options[0].id,
                                      type: question.type,
                                    });
                                  }}
                                />

                                {question.type ===
                                  QuestionnairTypes.boolean_reason && (
                                  <Textarea
                                    id="disabled-bg"
                                    label={question?.description?.english}
                                    value={values.responses[index].reason || ""}
                                    disabled={
                                      values.responses[index].option_id ===
                                      question.options[0].id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      setFieldValue(`responses.${index}`, {
                                        ...values.responses[index],
                                        reason: e.target.value,
                                      });
                                    }}
                                    className={
                                      values.responses[index].option_id ===
                                      question.options[0].id
                                        ? "w-full bg-inherit my-4 "
                                        : "w-full bg-inherit my-4"
                                    }
                                  />
                                )}

                                {question.type ===
                                  QuestionnairTypes.boolean_reason &&
                                  (values.responses[index].reason === null ||
                                    values.responses[index].reason === "") &&
                                  values.responses[index].option_id ===
                                    question.options[0].id && (
                                    <p className="text-xs text-red-500">
                                      * Reason is required if your answer is yes
                                    </p>
                                  )}
                              </div>
                            )}

                            <p></p>
                          </section>
                        )
                      )}
                    </div>
                  )}
                </FieldArray>
              </article>

              <div className="flex items-end justify-end mb-2 w-full">
                <Button
                  isLoading={postMutation.isPending}
                  type="submit"
                  color="primary"
                  className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] font-medium hover:text-white hover:border-none focus:text-white focus:border-none"
                >
                  Submit
                </Button>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default ClientIntake;
