import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import ExpertsList from "@/app/shared/operational-manager/experts/experts-list";

export const metadata = {
  ...metaObject("Experts"),
};

const pageHeader = {
  title: "Experts",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Dashboard",
    },

    {
      name: "Experts",
    },
  ],
};

export default function Experts() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.operationalManager.experts.create}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button color="primary">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Expert
          </Button>
        </Link>
      </PageHeader>

      <ExpertsList />
    </>
  );
}
