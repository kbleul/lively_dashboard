import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Avatar, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import Image from "next/image";

const ViewReport = ({ report }: { report: any }) => {
  const { closeModal } = useModal();
  console.log(report.reportable.user.profile_image);
  return (
    <article className="p-8">
      <div className="mb-7 flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <section className="flex justify-start gap-4">
        <section
          className="w-14 h-14 gap-x-4  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
          style={{
            backgroundImage: `url('${report.reportable.user.profile_image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 100,
          }}
        />

        <div className=" ">
          <Title as="h5" className="">
            {report.reportable.user?.first_name +
              " " +
              report.reportable.user?.last_name}
          </Title>
          <p className="text-[#008579] mt-1">
            @{report.reportable.user?.username}
          </p>
        </div>
      </section>

      <p className="mt-6 text-[#7B7B7B] pb-4 border-b">
        {report?.reason} sdjfsdfksdljf sdfnsdklfjweio asdfwepofmasklmdose
        asdfkepofkweskf
      </p>
    </article>
  );
};

export default ViewReport;
