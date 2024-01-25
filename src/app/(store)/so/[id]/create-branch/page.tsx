import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CreateBranchForm from "@/app/shared/so/CreateBranchForm";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },
    {
      name: "Branches",
    },
    {
      name: "Create Branch",
    },
  ],
};

const CreateBranch = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateBranchForm placeId={params.id} />
    </>
  );
};

export default CreateBranch;
