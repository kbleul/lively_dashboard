import React from "react";
import { metaObject } from "@/config/site.config";
import AddPackageDiscount from "@/app/shared/operational-manager/discounts/add-package-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateProductDiscount = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <AddPackageDiscount placeId={params.placeId} branchId={params.branchId} />
  );
};

export default CreateProductDiscount;
