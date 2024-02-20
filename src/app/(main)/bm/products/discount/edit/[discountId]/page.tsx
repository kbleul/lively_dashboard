import React from "react";
import { metaObject } from "@/config/site.config";
import EditProductDiscount from "@/app/shared/bm/discount/discounts/edit-product-discount-form";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateProductDiscount = ({
  params,
}: {
  params: { placeId: string; branchId: string; discountId: string };
}) => {
  return (
    <EditProductDiscount
      placeId={params.placeId}
      branchId={params.branchId}
      discountId={params.discountId}
    />
  );
};

export default CreateProductDiscount;
