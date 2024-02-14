"use client";

import React from "react";
import AddBranchManger from "./add-branch-manger";
import PageHeader from "../../page-header";
import { routes } from "@/config/routes";

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      href: routes.operationalManager.places.list,
      name: "Stores",
    },
    {
      name: "Store",
    },
    {
      name: "Branch Manager",
    },
  ],
};

const CreateBranchManagerForm = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  return (
    <article>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <AddBranchManger
        placeId={placeId}
        branchId={branchId}
        isBranchMangeMode
      />
    </article>
  );
};

export default CreateBranchManagerForm;
