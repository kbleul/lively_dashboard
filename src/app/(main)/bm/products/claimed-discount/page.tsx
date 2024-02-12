import ClaimedList from "@/app/shared/bm/products/ClaimedList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewClaimedProducthDiscounts = () => {
  return <ClaimedList />;
};

export default ViewClaimedProducthDiscounts;
