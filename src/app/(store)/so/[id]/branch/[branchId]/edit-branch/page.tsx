import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import EditBranchForm from "@/app/shared/so/edit-branch-form";

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },

    {
      name: "Branch",
    },
    {
      name: "Edit",
    },
  ],
};

const EditBranch = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <EditBranchForm placeId={params.id} branchId={params.branchId} />
    </>
  );
};

export default EditBranch;
