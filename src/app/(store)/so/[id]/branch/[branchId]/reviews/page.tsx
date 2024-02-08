import React from "react";
import { metaObject } from "@/config/site.config";
import ReviewsList from "@/app/shared/so/reviews/ReviewsList";

export const metadata = {
  ...metaObject("Reviews"),
};

const BranchReviews = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ReviewsList placeId={params.id} branchId={params.branchId} />;
};

export default BranchReviews;
