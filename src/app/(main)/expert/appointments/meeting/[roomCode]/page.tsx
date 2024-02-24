"use client";

import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import MeetingRoom from "@/app/shared/expert/appointments/MeetingRoom";
import { HMSRoomProvider } from "@100mslive/react-sdk";

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
    <HMSRoomProvider>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <MeetingRoom roomCode={params.roomCode} />
    </HMSRoomProvider>
  );
};

export default Meeting;
