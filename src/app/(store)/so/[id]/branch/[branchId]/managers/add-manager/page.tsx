import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import React from "react";
import { metaObject } from "@/config/site.config";
import AddManagerForm from "@/app/shared/so/managers/add-manager-form-branch";

export const metadata = {
  ...metaObject("Managers"),
};

const AddManager = ({
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
        href: routes.storeOwner.branches(params.id),
        name: "Branches",
      },
      {
        name: "Add Manager",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <AddManagerForm placeId={params.id} branchId={params.branchId} />
    </>
  );
};

export default AddManager;
