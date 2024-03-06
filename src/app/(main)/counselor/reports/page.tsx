import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ReportsList from "@/app/shared/counselor/reports/reportList";

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
      name: "Reports",
    },
  ],
};

export default function Counselor() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ReportsList />
    </>
  );
}
