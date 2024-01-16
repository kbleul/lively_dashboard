"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getColumns } from "./column";
export enum ExpertType {
  All = "All",
  Incomplete = "Incomplete",
}
export default function Contact() {
  const [activeTab, setActiveTab] = useState<ExpertType>(ExpertType.All);
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const expertsList = useFetchData(
    [queryKeys.getAllContactList, currentPage, pageSize, activeTab],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/contact-us?page=${currentPage}&per_page=${pageSize}`,
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
    <>
      <ControlledTable
        variant={"modern"}
        isLoading={expertsList.isFetching}
        showLoadingText={true}
        data={
          activeTab === ExpertType.All
            ? expertsList?.data?.data?.data
            : expertsList?.data?.data
        }
        scroll={activeTab === ExpertType.All ? { x: 1300 } : { x: 1000 }}
        // @ts-ignore
        columns={getColumns({ onDeleteItem: deleteExpert })}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total:
            activeTab === ExpertType.All
              ? expertsList?.data?.data?.total
              : expertsList?.data?.data?.length,
          current: currentPage,
          onChange: (page: number) => setCurrentPage(page),
        }}
        className={
          "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        }
      />
    </>
  );
}
