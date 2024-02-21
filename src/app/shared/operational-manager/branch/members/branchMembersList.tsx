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
import PageHeader from "@/app/shared/page-header";
import { getColumns } from "./member-columns";

const pageHeader = {
  title: "Operation Manager",
  breadcrumb: [
    {
      name: "Branch",
    },
    {
      name: "Branches",
    },
    {
      name: "Branch Members",
    },
  ],
};

const BranchMembersList = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const branchMembersData = useFetchData(
    [queryKeys.getAllMembers, pageSize, currentPage],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/members/${branchId}`,
    headers
  );

  if (
    branchMembersData?.isFetching ||
    branchMembersData?.isLoading ||
    branchMembersData.isPending
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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <WidgetCard
        title={"Branch Members"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        // action={
        //   <Link
        //     href={routes.operationalManager.places["create-branch-manager"](
        //       placeId,
        //       branchId
        //     )}
        //   >
        //     <Button size="lg" color="primary">
        //       Add Members
        //     </Button>
        //   </Link>
        // }
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={branchMembersData.isFetching}
            showLoadingText={true}
            data={branchMembersData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns(placeId, branchId)}
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

export default BranchMembersList;
