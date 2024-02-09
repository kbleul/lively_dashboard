import React from "react";
import { metaObject } from "@/config/site.config";
import ReviewsList from "@/app/shared/bm/reviews/ReviewsList";

export const metadata = {
  ...metaObject("Reviews"),
};

const BranchReviews = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <ReviewsList />;
};

export default BranchReviews;
