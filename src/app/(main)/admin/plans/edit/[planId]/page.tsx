import React from "react";
import { metaObject } from "@/config/site.config";
import EditPlanForm from "@/app/shared/admin/plan/edit-plan-form";

export const metadata = {
  ...metaObject("Plans"),
};
const Occupation = ({ params }: { params: { planId: string } }) => {
  return <EditPlanForm planId={params.planId} />;
};

export default Occupation;
