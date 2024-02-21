import React from "react";
import { metaObject } from "@/config/site.config";
import BranchMembersList from "@/app/shared/so/members/branchMembersList";

export const metadata = {
  ...metaObject("Members"),
};

const ViewBranchMembers = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <BranchMembersList placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchMembers;
