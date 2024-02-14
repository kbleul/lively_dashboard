import ProductDiscountsList from "@/app/shared/operational-manager/discounts/ProductDiscountsList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewBranchDiscounts = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <ProductDiscountsList placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchDiscounts;
