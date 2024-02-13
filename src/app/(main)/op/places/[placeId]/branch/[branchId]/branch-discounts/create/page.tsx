import React from "react";
import { metaObject } from "@/config/site.config";
import AddBranchDiscount from "@/app/shared/operational-manager/discounts/add-branch-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateBranchDiscount = ({ params }: { params: { branchId: string } }) => {
  return <AddBranchDiscount branchId={params.branchId} />;
};

export default CreateBranchDiscount;
