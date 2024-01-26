"use client";

import Spinner from "@/components/ui/spinner";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import { Button, Title } from "rizzui";
import PageHeader from "../../page-header";
import WidgetCard from "@/components/cards/widget-card";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./manager-columns";

const ManagersListAll = ({ id }: { id: string }) => {
  const pageHeader = {
    title: "Operation Manager",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(id),
        name: "Stores",
      },
      {
        name: "Branch Managers",
      },
    ],
  };

  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const branchManagersData = useFetchData(
    [queryKeys.getMyBranches + id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/all-managers/${id}`,
    headers
  );

  if (branchManagersData?.error || branchManagersData?.isError) {
    <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
      <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
        Error loading managers
      </Title>
    </div>;
  }

  if (branchManagersData?.isPending) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const deleteProduct = async (id: string) => {
    console.log(id);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <WidgetCard
        title={"Branch Managers"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <Link href={routes.storeOwner["add-manager"](id)}>
            <Button size="lg" color="primary">
              Add Manager
            </Button>
          </Link>
        }
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={branchManagersData.isFetching}
            showLoadingText={true}
            data={branchManagersData?.data?.data.map((item) => {
              return item.manager;
            })}
            scroll={{ x: 1300 }}
            // @ts-ignore
            columns={getColumns({ deleteProduct })}
            paginatorOptions={{
              pageSize: 1,
              setPageSize,
              total: 0,
              current: 1,
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

export default ManagersListAll;
