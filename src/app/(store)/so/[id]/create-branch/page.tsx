import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CreateBranchForm from "@/app/shared/so/CreateBranchForm";

export const metadata = {
  ...metaObject("Dashboard"),
};

const CreateBranch = ({ params }: { params: { id: string } }) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(params.id),
        name: "Store Owner",
      },
      {
        href: routes.storeOwner.branches(params.id),
        name: "Branches",
      },
      {
        name: "Create Branch",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateBranchForm placeId={params.id} />
    </>
  );
};

export default CreateBranch;
