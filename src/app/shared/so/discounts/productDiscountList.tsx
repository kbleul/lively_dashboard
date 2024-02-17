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
import { getColumns } from "./discount-columns-products";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import { useModal } from "../../modal-views/use-modal";
import ShowProductsModal from "./ShowProductsModal";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const CategoriesArr = ["Active", "Expired"];

const ProductDiscountList = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const { openModal } = useModal();
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const postMutation = useDynamicMutation();
  const productsDiscountData = useFetchData(
    [queryKeys.getAllProducts, pageSize, currentPage, categoryLink],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/${
      categoryLink === CategoriesArr[1]
        ? "expired-discount-products"
        : "discount-products"
    }/${branchId}?page=${currentPage}&per_page=${pageSize}`,

    headers
  );

  const viewProducts = (discount: any) => {
    openModal({
      view: <ShowProductsModal discount={discount} />,
      customSize: "550px",
    });
  };

  const updateHiddenStatus = async (sicountId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/publish-discount/${sicountId}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackages],
          });
          toast.success("Product hiddent status updated Successfully");
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
      title={"Discount"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Link
          href={routes.storeOwner.branch["add-product-discount"](
            placeId,
            branchId
          )}
        >
          <Button size="lg" color="primary">
            Add Product Discounts
          </Button>
        </Link>
      }
    >
      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={productsDiscountData.isFetching}
          showLoadingText={true}
          data={productsDiscountData?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(
            viewProducts,
            placeId,
            branchId,
            updateHiddenStatus,
            postMutation.isPending
          )}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: productsDiscountData?.data?.data?.total,
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

export default ProductDiscountList;
