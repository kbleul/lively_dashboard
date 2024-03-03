"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import AssessmentAnswersModal from "./AssessmentAnswersModal";
import { IoDocumentTextSharp } from "react-icons/io5";

const IntakeAnswers = () => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);

  const assessmentAnswers = useFetchData(
    [queryKeys.getClientAssessmentAnswers, currentPage],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/clients-intake?page=${currentPage}`,
    headers
  );

  const handlePageChange = () => {
    setCurrentPage((prev) => ++prev);
  };

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
  const clientsAssessmentAnswers = assessmentAnswers?.data?.data?.data;

  const viewAssessmentAnswer = (clientAssessmentAnswers: any) => {
    openModal({
      view: (
        <AssessmentAnswersModal
          assessmentAnswers={clientAssessmentAnswers.intake_responses}
          clientName={clientAssessmentAnswers.unique_code}
        />
      ),
      customSize: "700px",
    });
  };

  return (
    <main>
      {clientsAssessmentAnswers && clientsAssessmentAnswers.length === 0 && (
        <section className="mt-10 w-full flex justify-center">
          <Title as="h6">No Assessment Answers found for client!</Title>
        </section>
      )}

      <article className="flex flex-wrap justify-between items-center  gap-[2%] mb-10">
        {clientsAssessmentAnswers &&
          clientsAssessmentAnswers.length > 0 &&
          clientsAssessmentAnswers.map((answer: any) => (
            <section
              key={answer.unique_code}
              className="mt-4 shadow-md w-[49%]  flex justify-between items-center p-4  border-t rounded-xl"
            >
              <section className="flex gap-3 items-center">
                <div className="rounded-full w-14 h-14 bg-[#F4F6FF] flex justify-center items-center">
                  <IoDocumentTextSharp size={32} color="#00BA63" />
                </div>

                <p className="text-lg">{answer.unique_code}</p>
              </section>

              <div className="flex items-center gap-3 justify-self-end">
                <button
                  type="button"
                  className="text-black bg-white rounded-md py-1 px-1 border  lg:px-4 xl:px-4
                 hover:text-white  hover:bg-gradient-to-r hover:from-[#008579] hover:to-[#00BA63]"
                  onClick={() => viewAssessmentAnswer(answer)}
                >
                  View
                </button>
              </div>
            </section>
          ))}
      </article>

      {clientsAssessmentAnswers &&
        clientsAssessmentAnswers.length > 0 &&
        CustomPaginate(
          currentPage,
          assessmentAnswers?.data?.data?.next_page_url,
          handlePageChange
        )}
    </main>
  );
};

const CustomPaginate = (
  currentPage: number,
  hasNextPage: boolean,
  handlePageChange: () => void
) => {
  if (hasNextPage === null && currentPage == 1) {
    return <></>;
  }
  return (
    <>
      <article className="flex justify-center items-center gap-4">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange()}
          className="border px-3 py-1 rounded-md text-sm"
        >
          Prev.
        </button>
        <span>{currentPage}</span>
        <button
          type="button"
          disabled={hasNextPage ? false : true}
          onClick={() => handlePageChange()}
          className={
            hasNextPage
              ? "border px-3 py-1 rounded-md text-sm text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
              : "border px-3 py-1 rounded-md text-sm"
          }
        >
          Next
        </button>
      </article>
    </>
  );
};

export default IntakeAnswers;
