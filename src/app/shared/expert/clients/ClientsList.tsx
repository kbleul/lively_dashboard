"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";

import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import { getColumns } from "./columns";

const ClientsList = () => {
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const clientsList = useFetchData(
    [queryKeys.getAllClients, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/clients?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  if (clientsList.isPending || clientsList.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  return (
    <ControlledTable
      variant={"modern"}
      isLoading={clientsList.isFetching}
      showLoadingText={true}
      data={clientsList?.data?.data?.data}
      scroll={{ x: 900 }}
      // @ts-ignore
      columns={getColumns()}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: clientsList?.data?.data?.total,
        current: currentPage,
        onChange: (page: number) => setCurrentPage(page),
      }}
      className={
        "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      }
    />
  );
};

export default ClientsList;
