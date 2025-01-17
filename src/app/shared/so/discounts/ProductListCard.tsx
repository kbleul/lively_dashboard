"use client";
import React, { useState } from "react";
import { useFetchData } from "@/react-query/useFetchData";
import { Button } from "@/components/ui/button";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";

import Link from "next/link";
import { routes } from "@/config/routes";
import CustomCategory from "@/components/ui/custom-category";
import { getColumns } from "./discount-columns-products";

const PlaceListCategoriesLink = [
  {
    id: "places", //for api
    name: "Complete",
  },
  {
    id: "incomplete-places",
    name: "Incomplete",
  },
];

const DiscountList = () => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(
    PlaceListCategoriesLink[0].id
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const placessData = useFetchData(
    [queryKeys.getAllPlaces, currentPage, pageSize, categoryLink],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/${categoryLink}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const deleteProduct = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/places/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllProducts],
          });
          toast.success("Store Deleted Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WidgetCard
      title={"Stores"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Link href={routes.operationalManager.places.create}>
          <Button size="lg" color="primary">
            Add Stores
          </Button>
        </Link>
      }
    >
      <CustomCategory
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesLinks={PlaceListCategoriesLink}
      />

      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={placessData.isFetching}
          showLoadingText={true}
          data={placessData?.data?.data?.data}
          scroll={{ x: 1300 }}
          // @ts-ignore
          columns={getColumns({ deleteProduct })}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: placessData?.data?.data?.total,
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

export default DiscountList;
