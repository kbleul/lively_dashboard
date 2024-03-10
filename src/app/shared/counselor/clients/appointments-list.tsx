"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";

import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import SessionNotesAnswersModal from "./SessionNotesAnswersModal";
import { useModal } from "../../modal-views/use-modal";
import { getColumns } from "./appointment-columns";
import { getColumns as getColumnsUpcomming } from "./upcomming-appointment-columns";

export enum AppointmentType {
  Upcomming = "Upcomming",
  History = "History",
}

const CategoriesArr = ["Upcomming", "History"];

export default function AppointmentsList() {
  const { openModal } = useModal();

  const [activeTab, setActiveTab] = useState(CategoriesArr[0]);
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const appoitmentsList = useFetchData(
    [queryKeys.getAllAppointmentListEx, currentPage, pageSize, activeTab],
    activeTab === CategoriesArr[0]
      ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/upcoming-appointments?page=${currentPage}&per_page=${pageSize}`
      : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/appointment-histories?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  if (appoitmentsList.isPending || appoitmentsList.isFetching) {
    return (
      <>
        <CustomCategoryButton
          categoryLink={activeTab}
          setCategoryLink={setActiveTab}
          categoriesArr={CategoriesArr}
          labels={CategoriesArr}
        />
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />

          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      </>
    );
  }

  return (
    <>
      <CustomCategoryButton
        categoryLink={activeTab}
        setCategoryLink={setActiveTab}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      <ControlledTable
        variant={"modern"}
        isLoading={appoitmentsList.isFetching}
        showLoadingText={true}
        data={appoitmentsList?.data?.data?.data}
        scroll={{ x: 900 }}
        // @ts-ignore
        columns={
          activeTab === CategoriesArr[0] ? getColumnsUpcomming() : getColumns()
        }
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
    </>
  );
}
