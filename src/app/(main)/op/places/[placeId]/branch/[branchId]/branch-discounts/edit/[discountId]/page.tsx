import React from "react";
import { metaObject } from "@/config/site.config";
import EditBranchDiscount from "@/app/shared/operational-manager/discounts/edit-branch-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateBranchDiscount = ({
  params,
}: {
  params: { placeId: string; branchId: string; discountId: string };
}) => {
  return (
    <EditBranchDiscount
      placeId={params.placeId}
      branchId={params.branchId}
      discountId={params.discountId}
    />
  );
};

export default CreateBranchDiscount;
