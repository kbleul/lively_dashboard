import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ViewQuestion from "@/app/shared/counselor/assessment/view-questions";

const Appointment = ({ params }: { params: { categoryId: string } }) => {
  const pageHeader = {
    title: "Self-assessment ",
    breadcrumb: [
      {
        href: routes.counselor.dashboard,
        name: "Counselor",
      },
      {
        href: routes.counselor.assessments,
        name: "Self-assessment",
      },
      {
        name: "Category",
      },
      {
        name: "View questions",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ViewQuestion categoryId={params.categoryId} />
    </>
  );
};

export default Appointment;
