"use client";

import React from "react";
import AddBranchManger from "./add-branch-manger";
import PageHeader from "../../page-header";

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      name: "Stores",
    },
    {
      name: "Branch",
    },
    {
      name: "Branch Manager",
    },
  ],
};

const CreateBranchManagerForm = ({ branchId }: { branchId: string }) => {
  return (
    <article>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <AddBranchManger branchId={branchId} />
    </article>
  );
};

export default CreateBranchManagerForm;
