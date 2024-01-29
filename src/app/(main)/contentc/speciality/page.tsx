import React from "react";
import { metaObject } from "@/config/site.config";
import SpecialityList from "@/app/shared/contentc/speciality/specialities";

export const metadata = {
  ...metaObject("Speciality"),
};

const Speciality = () => {
  return <SpecialityList />;
};

export default Speciality;
