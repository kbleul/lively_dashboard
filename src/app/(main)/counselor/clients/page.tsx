import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ClientsList from "@/app/shared/counselor/clients/ClientsList";

export const metadata = {
  ...metaObject("Clients"),
};

const pageHeader = {
  title: "Clients",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Counselor",
    },
    {
      href: routes.counselor.dashboard,
      name: "Clients",
    },
  ],
};
const Clients = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ClientsList />
    </>
  );
};

export default Clients;
