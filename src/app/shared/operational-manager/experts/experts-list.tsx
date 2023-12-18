"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./components/expert-column";
import { Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export default function ExpertsList() {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const expertsList = useFetchData(
    [queryKeys.getAllExperts, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/experts?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  //approve appoitment
  const deleteExpert = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/experts/${id}`,
        method: "Delete",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllExperts],
          });
          toast.success("Expert Delete Successfully");
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
      variant={"modern"}
      isLoading={expertsList.isFetching}
      showLoadingText={true}
      data={expertsList?.data?.data?.data}
      scroll={{ x: 1300 }}
      // @ts-ignore
      columns={getColumns({ onDeleteExpert: deleteExpert })}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: expertsList?.data?.data?.total,
        current: currentPage,
        onChange: (page: number) => setCurrentPage(page),
      }}
      className={
        "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      }
    />
  );
}
