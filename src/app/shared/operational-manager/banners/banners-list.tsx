"use client";

import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import { getColumns } from "./columns";
import { getColumns as getColumnsSecondary } from "./columns_secondary";

import { useModal } from "../../modal-views/use-modal";
import AddBannerForm from "./add-banner-form";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";

const CategoriesArr = ["Requests", "Active", "Expired"];

const BannerTypeLinks = {
  [CategoriesArr[0]]: "banner-requests",
  [CategoriesArr[1]]: "active-banners",
  [CategoriesArr[2]]: "expired-banners",
};

const BannersList = () => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const bannersList = useFetchData(
    [queryKeys.getAllBanners, currentPage, pageSize, categoryLink],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/${BannerTypeLinks[categoryLink]}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const onAddBanner = (discountId: string) => {
    openModal({
      view: <AddBannerForm discountId={discountId} />,
      customSize: "500px",
    });
  };

  return (
    <>
      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      <ControlledTable
        variant={"modern"}
        isLoading={bannersList.isFetching}
        showLoadingText={true}
        data={bannersList?.data?.data?.data}
        scroll={{ x: 900 }}
        // @ts-ignore
        columns={
          categoryLink === CategoriesArr[0]
            ? getColumns({ onAddBanner })
            : getColumnsSecondary()
        }
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: bannersList?.data?.data?.total,
          current: currentPage,
          onChange: (page: number) => setCurrentPage(page),
        }}
        className={
          "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        }
      />
    </>
  );
};

export default BannersList;
