import AmenityList from "@/app/shared/contentc/amenity/amenity-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Amenity List"),
};

const page = () => {
  return <AmenityList />;
};

export default page;
