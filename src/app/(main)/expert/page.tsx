import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertDashboard from "@/app/shared/expert/dashboard/dashboard";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Expert",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Expert",
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

      <ExpertDashboard />
    </>
  );
}

// Dashboard
