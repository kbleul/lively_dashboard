import ClaimedList from "@/app/shared/so/discounts/ClaimedList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewClaimedProducthDiscounts = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ClaimedList placeId={params.id} branchId={params.branchId} />;
};

export default ViewClaimedProducthDiscounts;
