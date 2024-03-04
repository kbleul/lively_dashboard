import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CategoriesList from "@/app/shared/counselor/assessment/CategoriesList";

const Appointment = () => {
  const pageHeader = {
    title: "Self-assessment ",
    breadcrumb: [
      {
        href: routes.counselor.dashboard,
        name: "Counselor",
      },
      {
        name: "Self-assessment",
      },
      {
        name: "Category",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CategoriesList />
    </>
  );
};

export default Appointment;
