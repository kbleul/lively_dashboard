import React from "react";
import SpecialityList from "@/app/shared/content-creator/speciality/specialities";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Speciality"),
};

const Speciality = () => {
  return <SpecialityList />;
};

export default Speciality;
