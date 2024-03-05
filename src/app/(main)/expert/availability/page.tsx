import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertAvailability from "@/app/shared/expert/availability/expert-availability";
export const metadata = {
  ...metaObject("Availability"),
};

const Availability = () => {
  const pageHeader = {
    title: "Availability",
    breadcrumb: [
      {
        href: routes.expert.dashboard,
        name: "Expert",
      },

      {
        name: "Availability",
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ExpertAvailability />
    </>
  );
};

export default Availability;
