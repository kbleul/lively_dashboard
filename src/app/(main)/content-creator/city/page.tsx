import CityList from "@/app/shared/content-creator/city/city";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("City"),
};

const Cities = () => {
  return <CityList />;
};

export default Cities;
