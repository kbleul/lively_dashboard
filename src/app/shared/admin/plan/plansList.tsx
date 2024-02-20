"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { routes } from "@/config/routes";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { getColumns } from "./plans-columns";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ShowPlanModal from "./ShowPlanModal";

const PlansList = () => {
  const { openModal } = useModal();
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });

  // const postMutation = useDynamicMutation();
  const plansData = useFetchData(
    [queryKeys.getAllPlans],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/plans`,
    headers
  );

  const viewPlan = (plan: any) => {
    openModal({
      view: <ShowPlanModal plan={plan} />,
      customSize: "550px",
    });
  };

  const updateHiddenStatus = async (planId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/active-inactive-plan/${planId}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPlans],
          });
          toast.success("Plan active status updated Successfully");
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
        <Link href={routes.admin["add-plans"]}>
          <Button size="lg" color="primary">
            Add Plan
          </Button>
        </Link>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={plansData.isFetching}
          showLoadingText={true}
          data={plansData?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(
            viewPlan,
            updateHiddenStatus,
            postMutation.isPending
          )}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </WidgetCard>
  );
};

export default PlansList;
