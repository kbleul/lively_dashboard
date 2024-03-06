import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertDashboard from "@/app/shared/expert/dashboard/dashboard";
import IntakeAnswers from "@/app/shared/counselor/intake/IntakeAnswers";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Intake Answers",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Counselor",
    },

    {
      name: "Intake Answers",
    },
  ],
};

export default function Intake() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <IntakeAnswers />
    </>
  );
}
