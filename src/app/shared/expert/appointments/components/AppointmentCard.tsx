import { useModal } from "@/app/shared/modal-views/use-modal";
import Image from "next/image";
import React from "react";
import UserAppointmentModal from "./UserAppointmentModal";
import { MdOutlineCalendarMonth } from "react-icons/md";

const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const { openModal } = useModal();

  const viewAppointment = () => {
    openModal({
      view: <UserAppointmentModal appointment={appointment} />,
      customSize: "550px",
    });
  };

  return (
    <button
      className="flex items-center gap-2 bg-gradient-to-r from-[#008579] to-[#00BA63] w-full h-full rounded-xl text-white p-2"
      onClick={() => viewAppointment()}
    >
      <section className="w-4 h-4 md:w-14 md:h-14 bg-gray-100   rounded-full overflow-hidden">
        {appointment?.user?.profile_image &&
          !appointment?.user?.profile_image.includes("ui-avatars.com/") && (
            <></>
            // <Image
            //   src={
            //     appointment?.user?.profile_image &&
            //     appointment?.user?.profile_image
            //   }
            //   layout="fill"
            //   objectFit="cover"
            //   objectPosition="center"
            //   alt={""}
            //   className="max-w-36  relative"
            // />
          )}
      </section>
      <section className="hidden md:flex flex-col justify-start items-start ml-1 2xl:ml-2 ">
        <p className="font-semibold text-base 2xl:text-lg">
          {appointment.user.first_name + " " + appointment.user.last_name}
        </p>
        <div className="flex flex-col 2xl:flex-row  justify-start text-xs 2xl:text-sm gap-1 2xl:gap-2 ">
          <div className="2xl:border-r-2 border-white pr-2 gap-x-2 flex justify-start items-center">
            <MdOutlineCalendarMonth size={18} />
            <p>{appointment.date}</p>
          </div>

          <p>{appointment.time}</p>
        </div>
      </section>
    </button>
  );
};

export default AppointmentCard;
