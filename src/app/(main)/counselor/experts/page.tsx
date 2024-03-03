import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import ExpertsList from "@/app/shared/counselor/experts/experts-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Experts"),
};

const pageHeader = {
  title: "Experts",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Dashboard",
    },

    {
      href: "#",
      name: "Experts",
    },
  ],
};

export default function Experts() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ExpertsList />
    </>
  );
}
