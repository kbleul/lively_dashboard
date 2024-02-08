"use client";

import React, { useState } from "react";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { Title } from "rizzui";
import Spinner from "@/components/ui/spinner";
import PageHeader from "../../page-header";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./review-columns";

const ReviewsList = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(placeId),
        name: "Stores",
      },
      {
        name: "Branch Reviews",
      },
    ],
  };

  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const branchReviewssData = useFetchData(
    [queryKeys.getMyBranches + placeId, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/place-reviews/${branchId}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  if (branchReviewssData?.error || branchReviewssData?.isError) {
    <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
      <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
        Error loading reviews
      </Title>
    </div>;
  }

  if (branchReviewssData?.isPending) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }
  console.log(branchReviewssData?.data?.data);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <WidgetCard
        title={"Branch Reviews"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={branchReviewssData.isFetching}
            showLoadingText={true}
            data={branchReviewssData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns()}
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

export default ReviewsList;
