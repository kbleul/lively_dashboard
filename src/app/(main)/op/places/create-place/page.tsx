import React from "react";
import { metaObject } from "@/config/site.config";
import CreatePlaceForm from "@/app/shared/operational-manager/places/places-create";

export const metadata = {
  ...metaObject("Places"),
};
const Occupation = () => {
  return <CreatePlaceForm />;
};

export default Occupation;
