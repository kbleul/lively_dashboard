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
import { useRouter } from "next/navigation";

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      //   href: routes.storeOwner.dashboard,
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

const ManagersList = ({ id, branchId }: { id: string; branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const branchManagersData = useFetchData(
    [queryKeys.getMyBranches + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-managers/${branchId}`,
    headers
  );

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

  const editManager = (managerId: string) => {
    return router.push(
      routes.storeOwner.branch["edit-manager"](id, branchId, managerId)
    );
  };

  const deleteManager = async (id: string) => {
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
          <Link href={routes.storeOwner.branch["add-manager"](id, branchId)}>
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
            columns={getColumns({
              deleteManager,
              params: { placeId: id, branchId },
            })}
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

export default ManagersList;
