import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import AppointmentsList from "@/app/shared/counselor/clients/appointments-list";

const Appointment = () => {
  const pageHeader = {
    title: "Appointments",
    breadcrumb: [
      {
        href: routes.counselor.dashboard,
        name: "Counselor",
      },
      {
        name: "Appointments",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AppointmentsList />
    </>
  );
};

export default Appointment;
