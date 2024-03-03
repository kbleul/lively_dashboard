import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";

import { Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { SlCalender } from "react-icons/sl";
import SessionNotesAnswersModal from "./SessionNotesAnswersModal";

const SessionNotes = ({
  clientId,
  clientData,
}: {
  clientId: string;
  clientData: any;
}) => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const sessionNotesData = useFetchData(
    [queryKeys.getClientSessionNotes + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-session-summaries/${clientId}`,
    headers
  );

  if (sessionNotesData.isPending || sessionNotesData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const sessionNotes = sessionNotesData?.data?.data?.data;

  const converTimeFormat = (dateTime: string) => {
    const dateString = dateTime;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return formattedDate;
  };

  return (
    <article>
      {sessionNotes && sessionNotes.length === 0 && (
        <section className="mt-10 w-full flex justify-center">
          <Title as="h6">No session notes found for client!</Title>
        </section>
      )}

      <article className="flex items-center justify-start flex-wrap gap-[5%]">
        {sessionNotes &&
          sessionNotes.length > 0 &&
          sessionNotes.map((note: any) => (
            <section
              key={note.id}
              className="mt-4 px-8 shadow-md  w-[45%] py-4 gap-4 border-t rounded-md"
            >
              <Title as="h5" className="">
                Date
              </Title>

              <div className="flex justify-between items-center text-sm mt-2">
                <div className="pr-2 flex items-center justify-center gap-2">
                  <SlCalender />
                  <p className="">{converTimeFormat(note.created_at)}</p>
                </div>
                <button
                  className="border border-black px-4 rounded-md py-1"
                  onClick={() =>
                    openModal({
                      view: <></>,
                      customSize: "600px",
                    })
                  }
                >
                  Read
                </button>
              </div>
            </section>
          ))}
      </article>
    </article>
  );
};

export default SessionNotes;
