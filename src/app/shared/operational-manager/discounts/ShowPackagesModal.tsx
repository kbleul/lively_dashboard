import Image from "next/image";
import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";

const ShowPackagesModal = ({ discount }: { discount: any }) => {
  const { closeModal } = useModal();

  return (
    <article className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Packages
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {discount.packages &&
        discount.packages.length > 0 &&
        discount.packages.map((packageItem: any) => (
          <section
            key={packageItem.id}
            className="flex justify-start gap-4 p-2 px-4 mb-4 border rounded-xl"
          >
            <div className="flex flex-col justify-center items-start">
              <p className="font-semibold">{packageItem?.title?.english}</p>

              <p className="pl-1">
                Type - {packageItem?.package_type?.name?.english}{" "}
              </p>
            </div>
          </section>
        ))}
    </article>
  );
};

export default ShowPackagesModal;
