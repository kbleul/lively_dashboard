import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import Spinner from "@/components/ui/spinner";
import { FaStar } from "react-icons/fa6";

const ViewFeedbackModal = ({ appointmentId }: { appointmentId: string }) => {
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const feedbackData = useFetchData(
    ["getFeedback" + appointmentId, appointmentId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/client-appointment-feedback/${appointmentId}`,
    headers
  );

  if (feedbackData.isPending || feedbackData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const feedback = feedbackData?.data?.data;

  return (
    <article className="py-3 pb-5 px-5">
      <article className="mr-2">
        <div className="mb-3 flex items-center justify-end">
          <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
            <PiXBold className="h-auto w-5" />
          </ActionIcon>
        </div>

        {!feedback && (
          <Title as="h5" className="my-3 text-center">
            Feedback not added for this appointment.
          </Title>
        )}

        {feedback && (
          <article className="px-2">
            <div className="flex justify-between items-center">
              <Title
                as="h4"
                className="my-6 text-center font-medium text-xl text-[#008579]"
              >
                {feedback.user.first_name + " " + feedback.user.last_name}
              </Title>

              <div className="flex gap-2 items-center">
                <FaStar size={20} color="#FFAC2F" />
                <p className="text-black font-medium text-lg">
                  {feedback.rating}.0
                </p>
              </div>
            </div>
            <p className="leading-6">
              {feedback.review ? feedback.review : "No review notes added."}
            </p>
          </article>
        )}
      </article>
    </article>
  );
};

export default ViewFeedbackModal;
