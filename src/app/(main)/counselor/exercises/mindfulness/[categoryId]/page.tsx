import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExercisesList from "@/app/shared/counselor/exercises/ExercisesList";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Mindfulness Exercises",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Counselor",
    },
    {
      href: routes.counselor.mindfulness,
      name: "Mindfulness Categories",
    },
    {
      name: "Execises",
    },
  ],
};

export default function Mindfulness({
  params,
}: {
  params: { categoryId: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ExercisesList categoryId={params.categoryId} />
    </>
  );
}
