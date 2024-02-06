import ProductDiscountList from "@/app/shared/bm/discount/discounts/productDiscountList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const ViewBranchDiscounts = () => {
  return <ProductDiscountList />;
};

export default ViewBranchDiscounts;
