import React from "react";
import { metaObject } from "@/config/site.config";
import BranchMembersList from "@/app/shared/bm/members/branchMembersList";

export const metadata = {
  ...metaObject("Members"),
};

const ViewBranchMembers = () => {
  return <BranchMembersList />;
};

export default ViewBranchMembers;
