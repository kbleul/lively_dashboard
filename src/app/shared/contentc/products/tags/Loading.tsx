"use client";

import { useModal } from "@/app/shared/modal-views/use-modal";
import Spinner from "@/components/ui/spinner";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";

const Loading = ({ id }: { id?: string }) => {
  const { closeModal } = useModal();
  console.log("yes");
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {id ? "Edit Tag" : "Add Tag"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Spinner size="sm" />
    </div>
  );
};

export default Loading;
