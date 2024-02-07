import BranchDiscountsList from "@/app/shared/operational-manager/discounts/BranchDiscountsList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewBranchDiscounts = ({ params }: { params: { branchId: string } }) => {
  return <BranchDiscountsList branchId={params.branchId} />;
};

export default ViewBranchDiscounts;
