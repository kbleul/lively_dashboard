import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";

const ShowSubscriptionModal = ({
  subscription,
  isLoading,
  approveRequest,
  rejectRequest,
}: {
  subscription: any;
  isLoading: boolean;
  approveRequest: (subscriptionId: string) => Promise<void>;
  rejectRequest: (subscriptionId: string) => Promise<void>;
}) => {
  const { closeModal } = useModal();

  return (
    <article className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Subscription Request
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Title as="h4" className="font-medium mt-4 mb-2">
        Requested By
      </Title>
      <section className="flex justify-start items-stretch gap-6 p-4 md:p-5 border rounded-xl">
        <div className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl border-[1.8px] verflow-hidden relative border-gray-300 ">
          {subscription.user?.first_name[0] + subscription.user?.last_name[0]}
        </div>
        <div>
          <Title as="h5" className="font-medium">
            {subscription.user?.first_name + " " + subscription.user?.last_name}
          </Title>

          <div className="mt-2 flex flex-col gap-1">
            <p className="text-sm">{subscription.user?.username}</p>
            <p className="text-sm">+{subscription.user?.phone}</p>
          </div>
        </div>
      </section>

      <Title as="h4" className="font-medium mt-4 mb-2">
        Plan Details
      </Title>
      <section className="flex justify-start items-stretch gap-6 p-4 md:p-5 border rounded-xl">
        <div className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl border-[1.8px] verflow-hidden relative border-gray-300 " />
        <div>
          <Title as="h5" className="font-medium">
            {subscription.plan?.name?.english +
              " / " +
              subscription.plan?.name?.amharic}
          </Title>

          <div className="mt-2 flex flex-col gap-1">
            <p className="text-sm">{subscription.plan?.description?.english}</p>
            <p className="text-sm">
              {subscription.plan?.price + " " + subscription.plan?.currency}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t mt-8 flex justify-end gap-2">
        <Button
          tag="button"
          size="xl"
          color="DEFAULT"
          type="button"
          onClick={() => {
            rejectRequest(subscription.id);
            closeModal();
          }}
          className="text-black border bg-gray-300   min-w-32 mt-4 h-12 px-4 py-3 lg:px-8 xl:px-10"
        >
          {isLoading ? "..." : "Reject"}
        </Button>
        <Button
          tag="button"
          size="xl"
          color="primary"
          type="button"
          onClick={() => {
            approveRequest(subscription.id);
            closeModal();
          }}
          className="text-white bg-gradient-to-r from-[#008579] min-w-32 to-[#00BA63] mt-4 h-12 px-4 py-3 lg:px-8 xl:px-10"
        >
          {isLoading ? "..." : "Approve"}
        </Button>
      </section>
    </article>
  );
};

export default ShowSubscriptionModal;
