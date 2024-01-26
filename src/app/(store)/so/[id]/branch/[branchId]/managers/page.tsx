import React from "react";
import { metaObject } from "@/config/site.config";
import ManagersList from "@/app/shared/so/managers/ManagersList";

export const metadata = {
  ...metaObject("Branch Managers"),
};

const BranchManagers = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ManagersList id={params.id} branchId={params.branchId} />;
};

export default BranchManagers;
