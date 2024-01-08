"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./column";
import { Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export default function AppointmentList({
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

  const appoitmentsList = useFetchData(
    [queryKeys.getAllApoitmentsOp, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/expert-appointment-requests?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  //approve appoitment
  const onApproveItem = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/approve-expert-appointment/${id}`,
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
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/reject-expert-appointment/${id}`,
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
      isLoading={appoitmentsList.isFetching}
      showLoadingText={true}
      data={appoitmentsList?.data?.data?.data}
      scroll={{ x: 1300 }}
      // @ts-ignore
      columns={getColumns({ onApproveItem: onApproveItem, onRejectItem })}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: appoitmentsList?.data?.data?.total,
        current: currentPage,
        onChange: (page: number) => setCurrentPage(page),
      }}
      className={
        "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      }
    />
  );
}
