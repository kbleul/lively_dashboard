import React from "react";
import logo from "@public/logo.png";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Avatar, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import Image from "next/image";
import { CiUser } from "react-icons/ci";

const ViewReport = ({ report }: { report: any }) => {
  const { closeModal } = useModal();
  return (
    <article className="p-8">
      <div className="mb-3 flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <section className="flex justify-start gap-4">
        {report.reportable.user?.profile_image &&
        !report.reportable.user?.profile_image.includes(
          "https://ui-avatars.com/api/"
        ) ? (
          <Avatar
            name="profile image"
            src={report.reportable.user?.profile_image}
          />
        ) : (
          <Avatar
            name={"user profile"}
            src={
              "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            }
          />
        )}

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

      <p className="mt-6 text-[#7B7B7B] pb-4 border-b">{report?.reason}</p>

      <div className="mt-4 flex justify-start items-center gap-4">
        <div className="flex justify-center items-center text-white bg-gradient-to-r from-[#008579] to-[#00BA63] rounded-full w-12 h-12 ">
          <CiUser size={20} />
        </div>
        <p className="text-2xl">{report.unique_code}</p>
      </div>
    </article>
  );
};

export default ViewReport;
