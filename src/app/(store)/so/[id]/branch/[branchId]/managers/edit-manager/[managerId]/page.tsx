import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import React from "react";
import { metaObject } from "@/config/site.config";
import EditManagerForm from "@/app/shared/so/managers/edit-manager-form";

export const metadata = {
  ...metaObject("Managers"),
};

const EdidManager = ({
  params,
}: {
  params: { id: string; branchId: string; managerId: string };
}) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(params.id),
        name: "Store Owner",
      },
      {
        href: routes.storeOwner.branch.managers(params.id, params.branchId),
        name: "Managers",
      },
      {
        name: "Edit Manager",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <EditManagerForm
        placeId={params.id}
        branchId={params.branchId}
        managerId={params.managerId}
      />
    </>
  );
};

export default EdidManager;
