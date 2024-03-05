import Link from "next/link";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import PromptsList from "@/app/shared/counselor/journal/promptList";

export const metadata = {
  ...metaObject("Experts"),
};

const pageHeader = {
  title: "Journal Prompts",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Dashboard",
    },

    {
      href: "#",
      name: "Journal Prompts",
    },
  ],
};

export default function Experts() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <PromptsList />
    </>
  );
}
