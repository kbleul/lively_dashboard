"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";

import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { getColumns as getColumnsProducts } from "./discount-columns_products";
import { getColumns as getColumnsPackages } from "./discount-columns_packages";

import { routes } from "@/config/routes";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";

const CategoriesArr = [
  "Branch Discounts",
  "Expired Branch Discounts",
  "Products Discounts",
  "Expired Products Discounts",
  "Packages Discounts",
  "Expired Packages Discounts",
];

const BranchDiscountsList = ({ branchId }: { branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = React.useState(CategoriesArr[0]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const CategoriesLinks = {
    [CategoriesArr[0]]: {
      queryKey: "discount-place-branch",
      link: routes.operationalManager.places["add-branch-discounts"](branchId),
    },
    [CategoriesArr[1]]: {
      queryKey: "expired-discount-place-branch",
      link: routes.operationalManager.places["add-branch-discounts"](branchId),
    },
    [CategoriesArr[2]]: {
      queryKey: "discount-products",
      link: routes.operationalManager.places["add-product-discounts"](branchId),
    },
    [CategoriesArr[3]]: {
      queryKey: "expired-discount-products",
      link: routes.operationalManager.places["add-product-discounts"](branchId),
    },
    [CategoriesArr[4]]: {
      queryKey: "discount-packages",
      link: routes.operationalManager.places["add-package-discounts"](branchId),
    },
    [CategoriesArr[5]]: {
      queryKey: "expired-discount-packages",
      link: routes.operationalManager.places["add-package-discounts"](branchId),
    },
  };

  const productsDiscountData = useFetchData(
    [queryKeys.getAllPackages, categoryLink, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/${CategoriesLinks[categoryLink].queryKey}/${branchId}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const addButtonLabel =
    categoryLink.split(" ").length > 2
      ? "Add " + categoryLink.split(" ")[1] + " " + categoryLink.split(" ")[2]
      : "Add " + categoryLink;

  return (
    <>
      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />
      <WidgetCard
        title={"Discount"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <Link href={CategoriesLinks[categoryLink].link}>
            <Button size="lg" color="primary">
              {addButtonLabel}
            </Button>
          </Link>
        }
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={productsDiscountData.isFetching}
            showLoadingText={true}
            data={productsDiscountData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={
              categoryLink === "Products Discounts"
                ? getColumnsProducts()
                : getColumnsPackages()
            }
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
    </>
  );
};

export default BranchDiscountsList;
