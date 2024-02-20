import React from "react";
import { metaObject } from "@/config/site.config";
import EditPackageDiscount from "@/app/shared/operational-manager/discounts/edit-package-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateProductDiscount = ({
  params,
}: {
  params: { placeId: string; branchId: string; discountId: string };
}) => {
  return (
    <EditPackageDiscount
      placeId={params.placeId}
      branchId={params.branchId}
      discountId={params.discountId}
    />
  );
};

export default CreateProductDiscount;
