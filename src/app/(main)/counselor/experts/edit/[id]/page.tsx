import React from "react";
import { metaObject } from "@/config/site.config";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import EditExpertForm from "@/app/shared/experts/edit-expert/edit-expert-form";

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
      href: routes.counselor.experts.list,
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <EditExpertForm id={params.id} />
    </>
  );
};

export default EditExpertInfo;
