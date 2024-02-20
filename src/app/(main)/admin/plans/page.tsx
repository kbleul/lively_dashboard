import React from "react";
import { metaObject } from "@/config/site.config";
import PlansList from "@/app/shared/admin/plan/plansList";

export const metadata = {
  ...metaObject("Plans"),
};
const Occupation = () => {
  return <PlansList />;
};

export default Occupation;
