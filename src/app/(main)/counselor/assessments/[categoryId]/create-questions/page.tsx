import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import AddQuestionForm from "@/app/shared/counselor/assessment/add-question-form";

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
        name: "Create question",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AddQuestionForm categoryId={params.categoryId} />
    </>
  );
};

export default Appointment;
