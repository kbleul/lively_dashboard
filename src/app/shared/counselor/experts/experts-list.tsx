"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./components/expert-column";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ExpertTypeTab from "./components/expert-tab";
import { getIncompleteColumns } from "./components/incomplete-experts-table";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import { routes } from "@/config/routes";
export enum ExpertType {
  All = "All",
  Incomplete = "Incomplete",
}
export default function ExpertsList() {
  const [activeTab, setActiveTab] = useState<ExpertType>(ExpertType.All);
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const expertsList = useFetchData(
    [queryKeys.getAllExperts, currentPage, pageSize, activeTab],
    activeTab === ExpertType.All
      ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/experts?page=${currentPage}&per_page=${pageSize}`
      : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/incomplete-experts?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  //approve appoitment
  const deleteExpert = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/experts/${id}`,
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
    <WidgetCard
      title={"Tags"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button size="lg" color="primary">
          <Link href={routes.counselor.experts.create}>Add Expert</Link>
        </Button>
      }
    >
      <ExpertTypeTab setActiveTab={setActiveTab} activeTab={activeTab} />
      <ControlledTable
        variant={"modern"}
        isLoading={expertsList.isFetching}
        showLoadingText={true}
        data={
          activeTab === ExpertType.All
            ? expertsList?.data?.data?.data
            : expertsList?.data?.data
        }
        scroll={{ x: 900 }}
        // @ts-ignore
        columns={
          activeTab === ExpertType.All
            ? getColumns({ onDeleteExpert: deleteExpert, type: activeTab })
            : getIncompleteColumns({
                onDeleteExpert: deleteExpert,
                type: activeTab,
              })
        }
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
    </WidgetCard>
  );
}
