import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import MindfulnessCategoriesList from "@/app/shared/counselor/exercises/MindfulnessCategoriesList";

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
      name: "Exercises",
    },
    {
      name: "Mindfulness",
    },
  ],
};

export default function Mindfulness() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <MindfulnessCategoriesList />
    </>
  );
}
