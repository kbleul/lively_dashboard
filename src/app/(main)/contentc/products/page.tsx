import ProductList from "@/app/shared/contentc/products/product-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Product List"),
};

const page = () => {
  return <ProductList />;
};

export default page;
