"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button, Title } from "rizzui";
import Link from "next/link";
import ControlledTable from "@/components/controlled-table";
import { routes } from "@/config/routes";
import { useModal } from "@/app/shared/modal-views/use-modal";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddReasonForm from "./add-reason";
import { getColumns } from "./reports-columns";
import Loading from "../../contentc/products/tags/Loading";
import Spinner from "@/components/ui/spinner";
import ViewReport from "./view-report-modal";
// import ShowPlanModal from "./ShowPlanModal";

const ReportsList = () => {
  const { openModal } = useModal();
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const headers = useGetHeaders({ type: "Json" });

  // const postMutation = useDynamicMutation();
  const reportsData = useFetchData(
    ["getAllReports"],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}counsellor/reports`,
    headers
  );
  if (reportsData.isPending || reportsData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  console.log(reportsData.data.data.data);

  const onViewItem = (report: any) => {
    openModal({
      view: <ViewReport report={report} />,
    });
  };

  return (
    <WidgetCard
      title={"Reasons"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          variant={"modern"}
          isLoading={reportsData.isFetching}
          showLoadingText={true}
          data={reportsData?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(onViewItem, postMutation.isPending)}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </WidgetCard>
  );
};

export default ReportsList;
