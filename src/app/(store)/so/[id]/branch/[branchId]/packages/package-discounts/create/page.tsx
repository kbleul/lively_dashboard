import AddPackageDiscount from "@/app/shared/so/discounts/add-package-discount-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const CreateProductDiscount = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <AddPackageDiscount placeId={params.id} branchId={params.branchId} />;
};

export default CreateProductDiscount;
