"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { PackageDataType } from "@/types/packages";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import PackageListCard from "../../bm/packages/package-list-card";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";

const PackageList = ({ branchId }: { branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  // const postMutation = useDynamicMutation();
  const packagesData = useFetchData(
    [queryKeys.getAllPackages],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-packages/${branchId}`,

    headers
  );
  console.log(packagesData?.data?.data);
  return (
    <WidgetCard
      title={"Products"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button size="lg" color="primary">
          Add Products
        </Button>
      }
    >
      <div>
        {packagesData.isSuccess && packagesData?.isFetched ? (
          <div className="flex flex-col items-start space-y-3 w-full">
            {packagesData?.data?.data.length === 0 && (
              <p className="w-full text-center py-4 font-medium text-xl">
                No packages yet
              </p>
            )}
            {packagesData?.data?.data?.map((item: PackageDataType) => (
              <div key={item.category} className="w-full">
                <PackageListCard data={item} />
              </div>
            ))}
          </div>
        ) : (
          <Spinner size="xl" />
        )}
      </div>
    </WidgetCard>
  );
};

export default PackageList;
