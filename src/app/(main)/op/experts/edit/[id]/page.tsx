import React from "react";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import Link from "next/link";
import EditExpertForm from "@/app/shared/experts/edit-expert/edit-expert-form";

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
      href: routes.operationalManager.experts.list,
      name: "Experts",
    },
    {
      name: "Edit",
    },
  ],
};

interface Props {
  params: {
    id: string;
  };
}
const EditExpertInfo = ({ params }: Props) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.operationalManager.experts.create}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        ></Link>
      </PageHeader>
      <EditExpertForm id={params.id} />
    </>
  );
};

export default EditExpertInfo;
