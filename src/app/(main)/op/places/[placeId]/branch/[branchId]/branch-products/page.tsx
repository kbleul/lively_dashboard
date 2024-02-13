import ProductList from "@/app/shared/operational-manager/branch/products/product-list";
import { metaObject } from "@/config/site.config";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const metadata = {
  ...metaObject("Products"),
};

const BranchProducts = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return <ProductList placeId={params.placeId} branchId={params.branchId} />;
};

export default BranchProducts;
