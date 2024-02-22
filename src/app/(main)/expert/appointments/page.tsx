import AppointmentsList from "@/app/shared/expert/appointments/appointments-list";
import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";

const Appointment = () => {
  const pageHeader = {
    title: "Appointments",
    breadcrumb: [
      {
        href: routes.expert.dashboard,
        name: "Expert",
      },

      {
        name: "Appointments",
      },
    ],
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <AppointmentsList />
    </>
  );
};

export default Appointment;
