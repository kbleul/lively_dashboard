"use client";

import React, { useState } from "react";
import ControlledTable from "@/components/controlled-table";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import WidgetCard from "@/components/cards/widget-card";

import EditdProductForm from "./edit-product-form";
import { getColumns } from "./product-columns";
import AddProductForm from "./add-product-form";
import { useModal } from "@/app/shared/modal-views/use-modal";

export default function ProductList({
  placeId,
  branchId,
}: {
  placeId;
  branchId: string;
}) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const productsData = useFetchData(
    [
      queryKeys.getAllBranchProducts + branchId,
      branchId,
      currentPage,
      pageSize,
    ],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-products/${branchId}?page=${currentPage}&perPage=${pageSize}`,
    headers
  );

  //delete Product
  const deleteProduct = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-products/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBranchProducts + branchId],
          });
          toast.success("Product Deleted Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editItem = (id: string) => {
    openModal({
      view: <EditdProductForm branchId={branchId} productId={id} />,
      customSize: "500px",
    });
  };

  return (
    <>
      <WidgetCard
        title={"Products"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <Button
            onClick={() =>
              openModal({
                view: <AddProductForm placeId={placeId} branchId={branchId} />,
                customSize: "500px",
              })
            }
            size="lg"
            color="primary"
          >
            Add Products
          </Button>
        }
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={productsData.isFetching}
            showLoadingText={true}
            data={productsData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns({
              onDeleteItem: deleteProduct,
              onEditItem: editItem,
            })}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: productsData?.data?.data?.total,
              current: currentPage,
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
}
