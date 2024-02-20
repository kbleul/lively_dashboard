"use client";

import React from "react";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Loading from "@/app/(main)/op/loading";

const Occupation = ({ params }: { params: { discountId: string } }) => {
  const router = useRouter();

  const discountId = params.discountId;
  const headers = useGetHeaders({ type: "Json" });

  const getDiscountData = useFetchData(
    [queryKeys.getSingleClaimDiscount + discountId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/claimed-product-discount-detail/${discountId}`,
    headers
  );

  if (getDiscountData.failureCount > 5) {
    return (
      <div className="w-full h-[100vh] flex flex-col text-center justify-center items-center">
        <p>Unable to find the product claim id!</p>
        <p>
          You can maually navigate to the product claims section to approve the
          claim
        </p>
      </div>
    );
  }

  if (getDiscountData.isFetching) {
    return <Loading />;
  }

  localStorage.setItem("discountId", discountId);
  return router.push(routes.branchManger.claimedDiscount);
};

export default Occupation;