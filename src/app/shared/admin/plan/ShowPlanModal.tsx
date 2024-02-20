import Image from "next/image";
import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";

const ShowPlanModal = ({ plan }: { plan: any }) => {
  const { closeModal } = useModal();
  return (
    <article className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Plan
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <section>
        <p>{plan.name.english} </p>
      </section>
    </article>
  );
};

export default ShowPlanModal;
