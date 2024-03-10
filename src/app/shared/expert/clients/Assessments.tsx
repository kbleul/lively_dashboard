import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import AssessmentAnswersModal from "./IntakeAnswersModal";

const Assessment = ({
  clientId,
  clientData,
}: {
  clientId: string;
  clientData: any;
}) => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const assessmentAnswers = useFetchData(
    [queryKeys.getClientAssessmentAnswers + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-assessments/${clientId}`,
    headers
  );

  if (assessmentAnswers.isPending || assessmentAnswers.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const clientAssessmentAnswers = assessmentAnswers?.data?.data;

  if (!clientAssessmentAnswers) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  return (
    <article className="px-8 py-3 rounded-md shadow-md border-t w-full">
      {Object.keys(clientAssessmentAnswers).map(
        (key: string, index: number) => (
          <section
            key={index + key}
            className="py-3 flex gap-8 border-b border-dashed"
          >
            <p className="w-1/2 font-medium"> {key}</p>
            <p className="w-1/2"> {clientAssessmentAnswers[key]}</p>
          </section>
        )
      )}
    </article>
  );
};

export default Assessment;
