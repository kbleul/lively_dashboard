"use client";

import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getColumns } from "./columns";
import { useModal } from "../../modal-views/use-modal";
import AddBannerForm from "./add-banner-form";

// export enum BannerTabTypes {
//   Product = "Product",
//   Package = "Package",
// }

const BannersList = () => {
  //   const [activeTab, setActiveTab] = useState<BannerTabTypes>(
  //     BannerTabTypes.Product
  //   );
  const { openModal } = useModal();

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const bannersList = useFetchData(
    [queryKeys.getAllBanners, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/banner-requests`,
    headers
  );

  const onAddBanner = (discountId: string) => {
    openModal({
      view: <AddBannerForm discountId={discountId} />,
      customSize: "500px",
    });
  };

  return (
    <ControlledTable
      variant={"modern"}
      isLoading={bannersList.isFetching}
      showLoadingText={true}
      data={bannersList?.data?.data?.data}
      scroll={{ x: 900 }}
      // @ts-ignore
      columns={getColumns({ onAddBanner })}
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
  );
};

export default BannersList;
