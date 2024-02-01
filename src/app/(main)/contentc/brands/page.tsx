import BrandsList from "@/app/shared/contentc/products/brands/brands-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Brands"),
};

const page = () => {
  return <BrandsList />;
};

export default page;
