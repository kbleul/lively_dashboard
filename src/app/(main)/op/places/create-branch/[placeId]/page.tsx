import React from "react";

import { metaObject } from "@/config/site.config";

import CreateBranchForm from "@/app/shared/operational-manager/branch/CreateBranchForm";

export const metadata = {
  ...metaObject("Places"),
};

const CreateBranches = ({ params }: { params: { placeId: string } }) => {
  return <CreateBranchForm placeId={params.placeId} />;
};

export default CreateBranches;
