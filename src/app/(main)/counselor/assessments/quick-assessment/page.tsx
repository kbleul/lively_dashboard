import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import QuickAssessment from "@/app/shared/counselor/assessment/QuickAssessment";

const Assessment = () => {
  const pageHeader = {
    title: "Quick-Self-assessment ",
    breadcrumb: [
      {
        href: routes.counselor.dashboard,
        name: "Counselor",
      },
      {
        name: "Quick-Self-assessment",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <QuickAssessment />
    </>
  );
};

export default Assessment;
