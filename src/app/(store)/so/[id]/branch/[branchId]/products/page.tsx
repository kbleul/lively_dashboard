import ProductList from "@/app/shared/so/products/product-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Products"),
};

const BranchProducts = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ProductList placeId={params.id} branchId={params.branchId} />;
};

export default BranchProducts;
