import React from "react";
import { metaObject } from "@/config/site.config";
import AddProductDiscount from "@/app/shared/operational-manager/discounts/add-product-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateProductDiscount = ({
  params,
}: {
  params: { branchId: string };
}) => {
  return <AddProductDiscount branchId={params.branchId} />;
};

export default CreateProductDiscount;
