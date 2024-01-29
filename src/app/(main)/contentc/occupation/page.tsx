import React from "react";
import { metaObject } from "@/config/site.config";
import OccupationList from "@/app/shared/contentc/occupation/occupations";

export const metadata = {
  ...metaObject("Occupation"),
};
const Occupation = () => {
  return <OccupationList />;
};

export default Occupation;
