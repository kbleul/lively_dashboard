"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import { routes } from "@/config/routes";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./discount-columns";

const PackageDiscountList = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const postMutation = useDynamicMutation();
  const packagesDiscountData = useFetchData(
    [queryKeys.getAllPackages],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/discount-packages/${branchId}`,
    headers
  );

  //   routes.storeOwner.branch["add-package-discount"](
  //     placeId,
  //     branchId

  return (
    <WidgetCard
      title={"Discount"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Link href={"#"}>
          <Button size="lg" color="primary">
            Add Package Discounts
          </Button>
        </Link>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={packagesDiscountData.isFetching}
          showLoadingText={true}
          data={packagesDiscountData?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns()}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: packagesDiscountData?.data?.data?.total,
            current: currentPage,
            onChange: (page: number) => setCurrentPage(page),
          }}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </WidgetCard>
  );
};

export default PackageDiscountList;
