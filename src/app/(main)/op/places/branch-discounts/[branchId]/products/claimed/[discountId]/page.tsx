import ClaimedList from "@/app/shared/operational-manager/discounts/ClaimedList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewClaimedProducthDiscount = ({
  params,
}: {
  params: { branchId: string; discountId: string };
}) => {
  return (
    // <ClaimedDetails branchId={params.branchId} discountId={params.discountId} />
    <></>
  );
};

export default ViewClaimedProducthDiscount;
