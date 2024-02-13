import React from "react";
import { metaObject } from "@/config/site.config";
import BranchManagesrsList from "@/app/shared/operational-manager/branch/branchManagesrsList";

export const metadata = {
  ...metaObject("Branches"),
};

const ViewBranchManagers = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <BranchManagesrsList placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchManagers;
