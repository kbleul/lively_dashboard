import BranchDiscountsList from "@/app/shared/operational-manager/discounts/BranchDiscountsList";
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
    <BranchDiscountsList placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchDiscounts;
