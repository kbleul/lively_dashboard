"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { PackageDataType } from "@/types/packages";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import PackageListCard from "./package-list-card";

const PackageList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  // const postMutation = useDynamicMutation();
  const packagesData = useFetchData(
    [queryKeys.getAllPackages],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/branch-packages`,
    headers
  );
  return (
    <div>
      {packagesData.isSuccess && packagesData?.isFetched ? (
        <div className="flex flex-col items-start space-y-3 w-full">
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
  );
};

export default PackageList;
