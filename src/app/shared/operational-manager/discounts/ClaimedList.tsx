"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";

import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./claimed-columns";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "../../modal-views/use-modal";
import ClaimedDetails from "./ClaimedDetails";

const ClaimedList = ({ branchId }: { branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();

  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const claimedProductsDiscountData = useFetchData(
    [queryKeys.getAllClaimDiscounts, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/claimed-product-discounts/${branchId}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const handleView = (discountId: string) => {
    openModal({
      view: <ClaimedDetails discountId={discountId} />,
      customSize: "550px",
    });
  };
  const applyClaim = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url:
          `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/apply-claimed-product-discounts/` +
          id,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllClaimDiscounts],
          });

          queryClient.setQueryData([queryKeys.getAllClaimDiscounts], null);

          toast.success("Claim accepted successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WidgetCard
        title={"Discount"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={claimedProductsDiscountData.isFetching}
            showLoadingText={true}
            data={claimedProductsDiscountData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns(applyClaim, postMutation.isPending, handleView)}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: claimedProductsDiscountData?.data?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
            className={
              "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            }
          />
        </div>
      </WidgetCard>
    </>
  );
};

export default ClaimedList;
