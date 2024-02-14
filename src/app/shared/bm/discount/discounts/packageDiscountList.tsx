"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./discount-columns-packages";
import { routes } from "@/config/routes";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import ShowPackagesModal from "./ShowPackagesModal";
import { useModal } from "@/app/shared/modal-views/use-modal";

const CategoriesArr = ["Active", "Expired"];

const PackageDiscountList = () => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const postMutation = useDynamicMutation();
  const packagesDiscountData = useFetchData(
    [queryKeys.getAllPackages, pageSize, currentPage, categoryLink],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/${
      categoryLink === CategoriesArr[1]
        ? "expired-discount-packages"
        : "discount-packages"
    }?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const viewPackages = (discount: any) => {
    openModal({
      view: <ShowPackagesModal discount={discount} />,
      customSize: "550px",
    });
  };

  return (
    <WidgetCard
      title={"Discount"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Link href={routes.branchManger.createPackageDiscount}>
          <Button size="lg" color="primary">
            Add Package Discounts
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
          isLoading={packagesDiscountData.isFetching}
          showLoadingText={true}
          data={packagesDiscountData?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(viewPackages)}
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
