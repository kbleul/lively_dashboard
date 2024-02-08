"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";

import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getColumns } from "./booking-column";

export default function PackageBookingList({
  variant = "modern",
  className,
}: {
  variant?: "modern" | "minimal" | "classic" | "elegant" | "retro";
  className?: string;
}) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const bookingsList = useFetchData(
    [queryKeys.getAllApoitmentsOp, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/booking-requests?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  //approve appoitment
  const onApproveItem = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/approve-booking/${id}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllApoitmentsOp],
          });
          toast.success("Appoitment Approved Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  //on reject aapointment
  const onRejectItem = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/reject-booking/${id}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllApoitmentsOp],
          });
          toast.success("Appoitment Rejected Successfully");
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
    <ControlledTable
      variant={variant}
      isLoading={bookingsList.isFetching}
      showLoadingText={true}
      data={bookingsList?.data?.data?.data}
      scroll={{ x: 900 }}
      // @ts-ignore
      columns={getColumns({ onApproveItem: onApproveItem, onRejectItem })}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: bookingsList?.data?.data?.total,
        current: currentPage,
        onChange: (page: number) => setCurrentPage(page),
      }}
      className={
        "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      }
    />
  );
}
