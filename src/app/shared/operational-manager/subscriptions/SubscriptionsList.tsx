"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";

import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";

import { routes } from "@/config/routes";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import { useModal } from "../../modal-views/use-modal";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getColumns } from "./subscription-columns";
import { queryKeys } from "@/react-query/query-keys";
import ShowSubscriptionModal from "./ShowSubscriptionModal";

const CategoriesArr = ["Requested", "Approved"];

const SubscriptionsList = () => {
  const { openModal } = useModal();
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = React.useState(CategoriesArr[0]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const CategoriesLinks = {
    [CategoriesArr[0]]: {
      queryKey: "subscription-payment-requests",
      link: routes.operationalManager.places["add-package-discounts"](
        "placeId",
        "branchId"
      ),
    },
    [CategoriesArr[1]]: {
      queryKey: "expired-discount-packages",
      link: routes.operationalManager.places["add-package-discounts"](
        "placeId",
        "branchId"
      ),
    },
  };

  const subscriptionsData = useFetchData(
    [queryKeys.getAllSubscriptions, categoryLink, currentPage, pageSize],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/${CategoriesLinks[categoryLink].queryKey}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  const approveRequest = async (subscriptionId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/approve-subscription-payment-requests/${subscriptionId}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllSubscriptions],
          });
          toast.success("Subscription approved successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async (subscriptionId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/reject-subscription-payment-requests/${subscriptionId}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllSubscriptions],
          });
          toast.success("Subscription rejected successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const viewSubscription = (subscription: any) => {
    openModal({
      view: (
        <ShowSubscriptionModal
          subscription={subscription}
          isLoading={postMutation.isPending}
          approveRequest={approveRequest}
          rejectRequest={rejectRequest}
        />
      ),
      customSize: "550px",
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
      <WidgetCard
        title={"Subscriptions"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={subscriptionsData.isFetching}
            showLoadingText={true}
            data={subscriptionsData?.data?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns(
              viewSubscription,
              approveRequest,
              rejectRequest,
              postMutation.isPending
            )}
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: subscriptionsData?.data?.data?.total,
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

export default SubscriptionsList;
