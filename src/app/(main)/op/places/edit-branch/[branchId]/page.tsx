import React from "react";

import { metaObject } from "@/config/site.config";
import EditBranchForm from "@/app/shared/operational-manager/branch/EditBranchForm";

export const metadata = {
  ...metaObject("Places"),
};

const CreateBranches = ({ params }: { params: { branchId: string } }) => {
  return <EditBranchForm branchId={params.branchId} />;
};

export default CreateBranches;
