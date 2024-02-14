import React from "react";
import { metaObject } from "@/config/site.config";
import CreateBranchManagerForm from "@/app/shared/operational-manager/branch/CreateBranchManagerForm";

export const metadata = {
  ...metaObject("Places"),
};

const CreateBranchManager = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <CreateBranchManagerForm
      placeId={params.placeId}
      branchId={params.branchId}
    />
  );
};

export default CreateBranchManager;
