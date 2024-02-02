import PackageDiscountList from "@/app/shared/so/discounts/packageDiscountList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const DiscountList = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <PackageDiscountList placeId={params.id} branchId={params.branchId} />;
};

export default DiscountList;
