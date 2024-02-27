import React from "react";
import { metaObject } from "@/config/site.config";
import CreateMemberForm from "@/app/shared/so/members/create-member-form";

export const metadata = {
  ...metaObject("Members"),
};

const ViewBranchMembers = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  console.log("--", params.placeId, "==", params.branchId, "==");
  return (
    <CreateMemberForm placeId={params.placeId} branchId={params.branchId} />
  );
};

export default ViewBranchMembers;
