import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import EditBranchForm from "@/app/shared/so/edit-branch-form";

const EditBranch = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard,
        name: "Store Owner",
      },

      {
        name: routes.storeOwner.branch.dashboard(params.id, params.branchId),
      },
      {
        name: "Edit",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <EditBranchForm placeId={params.id} branchId={params.branchId} />
    </>
  );
};

export default EditBranch;
