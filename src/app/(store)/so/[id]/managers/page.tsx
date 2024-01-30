import React from "react";
import { metaObject } from "@/config/site.config";
import ManagersListAll from "@/app/shared/so/managers/ManagerListAll";

export const metadata = {
  ...metaObject("Branch Managers"),
};

const BranchManagers = ({ params }: { params: { id: string } }) => {
  return <ManagersListAll id={params.id} />;
};

export default BranchManagers;
