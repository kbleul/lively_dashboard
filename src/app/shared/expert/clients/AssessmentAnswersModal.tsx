import {
  QuestionnairRadioItems,
  QuestionnairTypes,
} from "@/constants/form-constants";
import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";

const AssessmentAnswersModal = ({
  assessmentAnswers,
}: {
  assessmentAnswers: any;
}) => {
  const { closeModal } = useModal();

  return (
    <article className="py-3 px-5 h-[96vh] hover:overflow-y-scroll">
      <div className="mb-3 flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <section className="border rounded-2xl overflow-hidden">
        <div className="h-8 bg-gradient-to-r from-[#008579] to-[#00BA63]" />
        <div className="px-8 py-3">
          <Title as="h5" className="text-xl font-medium">
            Client Name
          </Title>
          <p>Assessment Answers</p>
        </div>
      </section>

      <section className="border rounded-2xl overflow-hidden mt-2">
        <div className="h-8 bg-gradient-to-r from-[#008579] to-[#00BA63]">
          <p className="text-white font-semibold px-8 pt-[0.35rem]">
            Assessment Answers
          </p>
        </div>

        {assessmentAnswers.map((answer: any, index: number) => (
          <article
            className="my-4 px-8 py-2 border-b border-dashed"
            key={answer.question.id}
          >
            <p className="font-semibold">
              {index + 1}. {answer?.question?.question_text?.english}
            </p>

            <DispatchAnswerUI answer={answer} />
          </article>
        ))}
      </section>
    </article>
  );
};

const DispatchAnswerUI = ({ answer }: { answer: any }) => {
  if (QuestionnairRadioItems.includes(answer?.question?.type)) {
    if (answer?.question?.type === QuestionnairTypes.boolean_reason) {
      return (
        <article>
          <section className="flex gap-6 justify-start items-center">
            {answer?.question?.options?.map((choice: any) => (
              <div
                key={choice.id}
                className="pl-6 py-2 flex gap-2 items-center"
              >
                <div className="w-4 h-4 border flex items-center justify-center rounded-full">
                  {choice.id === answer?.response?.question_option_id && (
                    <div className="w-[0.7rem] h-[0.7rem] bg-black rounded-full" />
                  )}
                </div>

                <p className="py-4 text-[#5e5e5e]">
                  {choice?.choice_text?.english}
                </p>
              </div>
            ))}
          </section>

          {answer?.response?.other_answer && (
            <p className="px-6">{answer?.response?.other_answer}</p>
          )}
        </article>
      );
    }

    if (answer?.question?.type === QuestionnairTypes.multiple) {
      return (
        <div className="flex gap-3 justify-start items-center flex-wrap">
          {answer?.response?.map((response: any) => (
            <p key={response.id} className="border rounded-full px-4 py-2">
              {" "}
              {
                answer?.question?.options.find(
                  (option: any) =>
                    option.id === answer?.response?.question_option_id
                )?.choice_text?.english
              }
            </p>
          ))}
        </div>
      );
    }

    if (
      answer?.question?.type === QuestionnairTypes.boolean ||
      answer?.question?.type === QuestionnairTypes.single
    ) {
      return (
        <p className="px-6 py-2">
          {
            answer?.question?.options.find(
              (option: any) =>
                option.id === answer?.response?.question_option_id
            )?.choice_text?.english
          }
        </p>
      );
    }
  } else {
    return (
      <p className="px-6 py-2">
        {answer?.response?.other_answer ? answer?.response?.other_answer : ""}
      </p>
    );
  }
};

export default AssessmentAnswersModal;
