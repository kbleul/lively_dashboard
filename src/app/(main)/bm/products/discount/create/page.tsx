import AddProductDiscount from "@/app/shared/bm/discount/discounts/add-product-discount-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateBranchProductDiscounts = () => {
  return <AddProductDiscount />;
};

export default CreateBranchProductDiscounts;
