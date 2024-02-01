import UnitsList from "@/app/shared/contentc/products/units/units-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Units"),
};

const page = () => {
  return <UnitsList />;
};

export default page;
