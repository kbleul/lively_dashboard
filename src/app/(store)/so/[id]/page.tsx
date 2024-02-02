import React from "react";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import Dashboard from "@/app/shared/so/dashboard/dashboard";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Operation Manager",
    },

    {
      name: "Dashboard",
    },
  ],
};

const page = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <Dashboard />
    </>
  );
};

export default page;
