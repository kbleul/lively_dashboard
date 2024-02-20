import React from "react";
import { metaObject } from "@/config/site.config";
import AddPlanForm from "@/app/shared/admin/plan/add-plan-form";

export const metadata = {
  ...metaObject("Plans"),
};
const AddPlan = () => {
  return <AddPlanForm />;
};

export default AddPlan;
