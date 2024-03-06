import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CompletedAppointmentsList from "@/app/shared/counselor/clients/completed-appointments-list";

const Appointment = () => {
  const pageHeader = {
    title: "Appointments",
    breadcrumb: [
      {
        href: routes.counselor.dashboard,
        name: "Counselor",
      },
      {
        name: "Completed Appointments",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CompletedAppointmentsList />
    </>
  );
};

export default Appointment;
