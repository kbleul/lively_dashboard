import React from "react";
import { metaObject } from "@/config/site.config";
import OccupationList from "@/app/shared/operational-manager/occupation/occupations";

export const metadata = {
  ...metaObject("Occupation"),
};
const Occupation = () => {
  return <OccupationList />;
};

export default Occupation;
