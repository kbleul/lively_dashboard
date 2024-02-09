import BranchDiscountsList from "@/app/shared/operational-manager/discounts/BranchDiscountsList";
import ClaimedList from "@/app/shared/operational-manager/discounts/ClaimedList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewClaimedProducthDiscounts = ({
  params,
}: {
  params: { branchId: string };
}) => {
  return <ClaimedList branchId={params.branchId} />;
};

export default ViewClaimedProducthDiscounts;
