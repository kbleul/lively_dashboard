import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import AssessmentAnswersModal from "./IntakeAnswersModal";

const Intake = ({
  clientId,
  clientData,
}: {
  clientId: string;
  clientData: any;
}) => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const intakeAnswers = useFetchData(
    [queryKeys.getClientAssessmentAnswers + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-intake-responses/${clientId}`,
    headers
  );

  if (intakeAnswers.isPending || intakeAnswers.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const clientAssessmentAnswers = intakeAnswers?.data?.data;

  const viewAssessmentAnswer = () => {
    openModal({
      view: (
        <AssessmentAnswersModal
          intakeAnswers={clientAssessmentAnswers}
          clientName={clientData.first_name + " " + clientData.last_name}
        />
      ),
      customSize: "700px",
    });
  };

  return (
    <article>
      <Title as="h4" className="font-medium">
        Client and Expert Intake Answers
      </Title>

      {clientAssessmentAnswers && clientAssessmentAnswers.length === 0 && (
        <section className="mt-10 w-full flex justify-center">
          <Title as="h6">No Intake Answers found for client!</Title>
        </section>
      )}

      {clientAssessmentAnswers && clientAssessmentAnswers.length > 0 && (
        <section className="mt-4 shadow-md flex justify-between items-center w-1/2 p-4 gap-4 border-t rounded-md">
          <section className="flex gap-3 items-center">
            <div className="rounded-full w-14 h-14 bg-[#F4F6FF] flex justify-center items-center">
              <IoDocumentTextSharp size={32} color="#00BA63" />
            </div>

            <p className="text-lg">Intake Answers</p>
          </section>

          <div className="flex items-center gap-3 justify-self-end">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] rounded-md py-2 px-2  lg:px-6 xl:px-8"
              onClick={() => viewAssessmentAnswer()}
            >
              View
            </button>
          </div>
        </section>
      )}
    </article>
  );
};

export default Intake;
