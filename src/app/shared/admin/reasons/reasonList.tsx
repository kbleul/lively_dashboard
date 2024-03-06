"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { routes } from "@/config/routes";
import { useModal } from "@/app/shared/modal-views/use-modal";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getColumns } from "./reasons-columns";
import AddReasonForm from "./add-reason";
// import ShowPlanModal from "./ShowPlanModal";

const ReasonsList = () => {
  const { openModal } = useModal();
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });

  // const postMutation = useDynamicMutation();
  const reportsData = useFetchData(
    [queryKeys.getAllReasons],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/report-reasons`,
    headers
  );

  const onDeleteItem = async (reasonId: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/report-reasons/${reasonId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllReasons],
          });
          toast.success("Report reason deleted Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onEditItem = (id: string) => {
    openModal({
      view: <AddReasonForm id={id} />,
    });
  };

  return (
    <WidgetCard
      title={"Reasons"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button
          size="lg"
          color="primary"
          onClick={() =>
            openModal({
              view: <AddReasonForm />,
            })
          }
        >
          Add Report Reason
        </Button>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={reportsData.isFetching}
          showLoadingText={true}
          data={reportsData?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(onEditItem, onDeleteItem, postMutation.isPending)}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </WidgetCard>
  );
};

export default ReasonsList;
