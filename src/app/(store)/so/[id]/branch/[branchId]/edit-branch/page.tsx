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
        href: routes.storeOwner.dashboard(params.id),
        name: "Store Owner",
      },

      {
        href: routes.storeOwner.branch.dashboard(params.id, params.branchId),
        name: "Branch",
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
