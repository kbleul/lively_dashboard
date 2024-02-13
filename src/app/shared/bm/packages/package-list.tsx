"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { PackageDataType } from "@/types/packages";
import React from "react";
import PackageListCard from "./package-list-card";
import ReorderPackages from "./reorder-packages-modal";
import { useModal } from "../../modal-views/use-modal";

const PackageList = () => {
  const { openModal } = useModal();

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
          <button
            className="  px-4 py-1 border rounded-md shadow-md text-sm"
            type="button"
            onClick={() =>
              openModal({
                view: <ReorderPackages />,
                customSize: "550px",
              })
            }
          >
            Reorder Categories
          </button>
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
