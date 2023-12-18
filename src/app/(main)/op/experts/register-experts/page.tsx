import RegisterExpertForm from "@/app/shared/experts/register-experts";
import React from "react";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";

export const metadata = {
  ...metaObject("Register Experts"),
};
const pageHeader = {
  title: "Register Expert",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Dashboard",
    },
    {
      href: routes.operationalManager.experts.list,
      name: "Expert",
    },
    {
      name: "Create",
    },
  ],
};

const RegisterExperts = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <RegisterExpertForm />;
    </>
  );
};

export default RegisterExperts;
