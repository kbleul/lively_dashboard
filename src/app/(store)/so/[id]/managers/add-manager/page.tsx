import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import React from "react";
import { metaObject } from "@/config/site.config";
import AddManagerForm from "@/app/shared/so/managers/add-manager-form";

export const metadata = {
  ...metaObject("Managers"),
};

const AddManager = ({ params }: { params: { id: string } }) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(params.id),
        name: "Store Owner",
      },

      {
        name: "Add Manager",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <AddManagerForm placeId={params.id} />
    </>
  );
};

export default AddManager;
