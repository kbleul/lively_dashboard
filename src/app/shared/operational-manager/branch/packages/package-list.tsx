"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { PackageDataType } from "@/types/packages";
import React from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import { routes } from "@/config/routes";
import PackageListCard from "./package-list-card";

import { useModal } from "@/app/shared/modal-views/use-modal";
import ReorderPackages from "./reorder-packages-modal";

const PackageList = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();

  // const postMutation = useDynamicMutation();
  const packagesData = useFetchData(
    [queryKeys.getAllPackages],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-packages/${branchId}`,

    headers
  );

  return (
    <WidgetCard
      title={"Packages"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Link
          href={routes.operationalManager.places["create-packages"](
            placeId,
            branchId
          )}
        >
          <Button size="lg" color="primary">
            Add Packages
          </Button>
        </Link>
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

            <button
              className="  px-4 py-1 border rounded-md shadow-md text-sm"
              type="button"
              onClick={() =>
                openModal({
                  view: <ReorderPackages branchId={branchId} />,
                  customSize: "550px",
                })
              }
            >
              Reorder Categories
            </button>
            {packagesData?.data?.data?.map((item: PackageDataType) => (
              <div key={item.category} className="w-full">
                <PackageListCard data={item} branchId={branchId} />
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
