import React from "react";
import { metaObject } from "@/config/site.config";
import BranchMemberDetail from "@/app/shared/operational-manager/branch/members/branchMemberDetail";

export const metadata = {
  ...metaObject("Members"),
};

const ViewBranchMembers = ({
  params,
}: {
  params: { placeId: string; branchId: string; userId: string };
}) => {
  return (
    <BranchMemberDetail
      placeId={params.placeId}
      branchId={params.branchId}
      userId={params.userId}
    />
  );
};

export default ViewBranchMembers;
