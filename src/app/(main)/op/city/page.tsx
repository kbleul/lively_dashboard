import CityList from "@/app/shared/operational-manager/city/city";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("City"),
};

const Cities = () => {
  return <CityList />;
};

export default Cities;
