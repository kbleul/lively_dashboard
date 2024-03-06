import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertDashboard from "@/app/shared/expert/dashboard/dashboard";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Counselor",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Counselor",
    },

    {
      name: "Dashboard",
    },
  ],
};

export default function Counselor() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ExpertDashboard />
    </>
  );
}

// Dashboard
