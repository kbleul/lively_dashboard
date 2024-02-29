import React from "react";
import { metaObject } from "@/config/site.config";
import ReasonsList from "@/app/shared/admin/reasons/reasonList";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";

export const metadata = {
  ...metaObject("Report Reasons"),
};

const pageHeader = {
  title: "Bookings",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard",
    },

    {
      name: "Report Reasons",
    },
  ],
};

const page = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ReasonsList />
    </>
  );
};

export default page;
