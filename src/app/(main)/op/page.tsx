import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import Dashboard from "@/app/shared/operational-manager/dashboard/dashboard";

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

export default function Appointments() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <Dashboard />
    </>
  );
}

// Dashboard
