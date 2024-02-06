import AddPackageDiscount from "@/app/shared/bm/discount/discounts/add-package-discount-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateBranchPackageDiscounts = () => {
  return <AddPackageDiscount />;
};

export default CreateBranchPackageDiscounts;
