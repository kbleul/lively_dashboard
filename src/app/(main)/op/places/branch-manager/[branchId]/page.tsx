import React from "react";
import { metaObject } from "@/config/site.config";
import BranchManagesrsList from "@/app/shared/operational-manager/branch/branchManagesrsList";

export const metadata = {
  ...metaObject("Branches"),
};

const ViewBranchManagers = ({ params }: { params: { branchId: string } }) => {
  return <BranchManagesrsList branchId={params.branchId} />;
};

export default ViewBranchManagers;
