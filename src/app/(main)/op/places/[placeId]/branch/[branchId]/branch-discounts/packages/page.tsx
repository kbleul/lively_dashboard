import PackageDiscountsList from "@/app/shared/operational-manager/discounts/PackageDiscountsList";
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
    <PackageDiscountsList placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchDiscounts;
