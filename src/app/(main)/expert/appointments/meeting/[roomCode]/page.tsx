import AppointmentsList from "@/app/shared/expert/appointments/appointments-list";
import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import MeetingRoom from "@/app/shared/expert/appointments/MeetingRoom";

const Meeting = ({ params }: { params: { roomCode: string } }) => {
  const pageHeader = {
    title: "Appointments",
    breadcrumb: [
      {
        href: routes.expert.dashboard,
        name: "Expert",
      },
      {
        href: routes.expert.appointments,
        name: "Appointments",
      },
      {
        href: routes.expert.appointments,
        name: "Meeting Room",
      },
    ],
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <MeetingRoom roomCode={params.roomCode} />
    </>
  );
};

export default Meeting;
