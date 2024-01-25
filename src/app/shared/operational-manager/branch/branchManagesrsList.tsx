"use client";

import WidgetCard from "@/components/cards/widget-card";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Link from "next/link";
import React, { useState } from "react";
import { Title } from "rizzui";
import { Button } from "@/components/ui/button";
import ControlledTable from "@/components/controlled-table";
import { routes } from "@/config/routes";
import { getColumns } from "./manager-columns";
import PageHeader from "../../page-header";

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      name: "Stores",
    },
    {
      name: "Branches",
    },
    {
      name: "Branch Managers",
    },
  ],
};

const BranchManagesrsList = ({ branchId }: { branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const branchManagersData = useFetchData(
    [queryKeys.getMyBranches],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-managers/${branchId}`,
    headers
  );

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  if (
    branchManagersData?.isFetching ||
    branchManagersData?.isLoading ||
    branchManagersData.isPending
  ) {
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
          <Link
            href={routes.operationalManager.places["create-branch-manager"](
              branchId
            )}
          >
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
            data={branchManagersData?.data?.data}
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

export default BranchManagesrsList;
