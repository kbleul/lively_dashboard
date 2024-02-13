import ClaimedList from "@/app/shared/operational-manager/discounts/ClaimedList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewClaimedProducthDiscounts = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return <ClaimedList placeId={params.placeId} branchId={params.branchId} />;
};

export default ViewClaimedProducthDiscounts;
