import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import CentersList from "@/app/shared/operational-manager/centers/centers-list";

export const metadata = {
  ...metaObject("Wellbeing Centers"),
};

const pageHeader = {
  title: "Wellbeing Centers",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Dashboard",
    },

    {
      name: "Centers",
    },
  ],
};

export default function Centers() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.operationalManager.centers.create}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button color="primary">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Center
          </Button>
        </Link>
      </PageHeader>

      <CentersList />
    </>
  );
}
