"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./columns";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import CustomScheduleView from "./components/CustomScheduleView";
export enum AppointmentType {
  Upcomming = "Upcomming",
  History = "History",
}

const CategoriesArr = ["Upcomming", "History"];

export default function AppointmentsList() {
  const [activeTab, setActiveTab] = useState(CategoriesArr[0]);
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const appoitmentsList = useFetchData(
    [queryKeys.getAllAppointmentListEx, currentPage, pageSize, activeTab],
    activeTab === CategoriesArr[0]
      ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/upcoming-appointments?page=${currentPage}&per_page=${pageSize}`
      : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/appointment-histories?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  //   if (isLoading) {
  //     return (
  //       <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
  //         <Spinner size="xl" />

  //         <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
  //           Loading...
  //         </Title>
  //       </div>
  //     );
  //   }

  return (
    <>
      {/* <AppintmentListTab setActiveTab={setActiveTab} activeTab={activeTab} /> */}
      <CustomCategoryButton
        categoryLink={activeTab}
        setCategoryLink={setActiveTab}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      {activeTab === CategoriesArr[0] && !appoitmentsList.isFetching && (
        <CustomScheduleView
          apponintmentsList={appoitmentsList?.data?.data?.data.reverse()}
        />
      )}
      {activeTab === CategoriesArr[1] && (
        <ControlledTable
          variant={"modern"}
          isLoading={appoitmentsList.isFetching}
          showLoadingText={true}
          data={appoitmentsList?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns()}
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
      )}
    </>
  );
}
