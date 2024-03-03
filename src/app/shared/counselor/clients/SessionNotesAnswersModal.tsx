import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import Spinner from "@/components/ui/spinner";

const SessionNotesAnswersModal = ({
  appointmentId,
  clientName,
}: {
  appointmentId: string;
  clientName?: string;
}) => {
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const sessionNotes = useFetchData(
    [queryKeys.getClientSessionNotes + appointmentId, appointmentId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/session-summaries/${appointmentId}`,
    headers
  );

  if (sessionNotes.isPending || sessionNotes.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const sessionNotesAnswers = sessionNotes?.data?.data;

  return (
    <article className="py-3 px-5 h-[96vh] hover:overflow-y-scroll customScroll">
      <article className="mr-2">
        <div className="mb-3 flex items-center justify-end">
          <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>
        <section className="border rounded-2xl overflow-hidden">
          <div className="h-8 bg-gradient-to-r from-[#008579] to-[#00BA63]" />
          <div className="px-8 py-3">
            <Title as="h5" className="text-xl font-medium">
              {clientName}
            </Title>
            <p>Session Review Notes</p>
          </div>
        </section>

        <section className="border rounded-2xl overflow-hidden mt-2">
          <div className="h-8 bg-gradient-to-r from-[#008579] to-[#00BA63]">
            <p className="text-white font-semibold px-8 pt-[0.35rem]">
              Session Notes Answers
            </p>
          </div>

          <article className="my-4 px-8 py-2 border-b border-dashed">
            <p className="font-semibold">
              1. Brief client history during the session:
            </p>
            <p className="px-4 py-2">{sessionNotesAnswers.history}</p>

            <p className="font-semibold">2. Reason for counseling:</p>
            <p className="px-4 py-2">{sessionNotesAnswers.reason}</p>

            <p className="font-semibold">
              3. {"Therapist's observations of the client"}:
            </p>
            <p className="px-4 py-2">{sessionNotesAnswers.observations}</p>

            <p className="font-semibold">4. herapist-client interaction:</p>
            <p className="px-4 py-2">{sessionNotesAnswers.interaction}</p>

            <p className="font-semibold">
              5. Problems addressed/ Activities done during session:
            </p>
            <p className="px-4 py-2">{sessionNotesAnswers.activities}</p>

            <p className="font-semibold">6. Challenges observed:</p>
            <p className="px-4 py-2">{sessionNotesAnswers.challenges}</p>

            <p className="font-semibold">7. Assignments:</p>
            <p className="px-4 py-2">{sessionNotesAnswers.assignments}</p>

            <p className="font-semibold">8. Next session plan:</p>
            <p className="px-4 py-2">{sessionNotesAnswers.next_session_plan}</p>
          </article>
        </section>
      </article>
    </article>
  );
};

export default SessionNotesAnswersModal;
