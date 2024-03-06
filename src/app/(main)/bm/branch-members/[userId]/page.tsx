import React from "react";
import { metaObject } from "@/config/site.config";
import BranchMemberDetail from "@/app/shared/bm/members/branchMemberDetail";

export const metadata = {
  ...metaObject("Members"),
};

const ViewBranchMembers = ({ params }: { params: { userId: string } }) => {
  return <BranchMemberDetail userId={params.userId} />;
};

export default ViewBranchMembers;
