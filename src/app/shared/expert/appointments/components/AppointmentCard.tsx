import { useModal } from "@/app/shared/modal-views/use-modal";
import Image from "next/image";
import React from "react";
import UserAppointmentModal from "./UserAppointmentModal";

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
      className="flex items-center gap-2"
      onClick={() => viewAppointment()}
    >
      <section className="w-14 h-14 bg-gray-100  rounded-full overflow-hidden">
        {appointment?.user?.profile_image &&
          !appointment?.user?.profile_image.includes("ui-avatars.com/") && (
            <Image
              src={
                appointment?.user?.profile_image &&
                appointment?.user?.profile_image
              }
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={""}
            />
          )}
      </section>
      <section>
        <p>{appointment.user.first_name + " " + appointment.user.last_name}</p>
        <div>
          <div>
            <p>{appointment.date}</p>
          </div>

          <p>{appointment.time}</p>
        </div>
      </section>
    </button>
  );
};

export default AppointmentCard;
