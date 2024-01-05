import React from "react";
import { metaObject } from "@/config/site.config";
import PlacesList from "@/app/shared/operational-manager/places/places-list";

export const metadata = {
  ...metaObject("Places"),
};
const Occupation = () => {
  return <PlacesList />;
};

export default Occupation;
