import Image from "next/image";
import React from "react";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { PiXBold } from "react-icons/pi";

const ViewCategory = ({ category }: { category: any }) => {
  const { closeModal } = useModal();

  return (
    <article className="p-8">
      <div className="flex justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Title as="h4" className="border-b mb-4 pb-1 ">
        Category
      </Title>

      <div className="h-[14vh] w-full overflow-hidden relative">
        <Image
          src={category.image.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={""}
        />
      </div>

      <Title as="h6" className="mt-3 border-b mb-4 pb-1 text-lg font-medium">
        Title : {category.name.english}
      </Title>

      <p className="p-4 mt-4 border rounded-xl border-[#5F5F5F]">
        {category.description.english}
      </p>
    </article>
  );
};

export default ViewCategory;
