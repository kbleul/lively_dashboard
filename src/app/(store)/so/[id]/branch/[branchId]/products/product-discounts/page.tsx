import ProductDiscountList from "@/app/shared/so/discounts/productDiscountList";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Discounts"),
};

const DiscountList = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ProductDiscountList placeId={params.id} branchId={params.branchId} />;
};

export default DiscountList;
