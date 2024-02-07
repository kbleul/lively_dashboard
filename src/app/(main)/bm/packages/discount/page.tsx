import PackageDiscountList from "@/app/shared/bm/discount/discounts/packageDiscountList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewBranchDiscounts = () => {
  return <PackageDiscountList />;
};

export default ViewBranchDiscounts;
