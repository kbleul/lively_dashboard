"use client";
import React from "react";
import { getColumns } from "./service-columns";
import { useFetchData } from "@/react-query/useFetchData";
import { Button } from "@/components/ui/button";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useModal } from "../../modal-views/use-modal";
// import CommonToolTableWidget from "../common/tools-table";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useTable } from "@/hooks/use-table";
import AddServiceForm from "./add-service-form";
const ServiceList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const { openModal } = useModal();
  const serviceData = useFetchData(
    [queryKeys.getAllServices],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/services`,
    headers
  );

  //delet unit
  const deleteCity = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/services/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllServices],
          });
          toast.success("Services Deleted Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [pageSize, setPageSize] = React.useState(10);
  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    searchTerm,
    handleSort,
    handleDelete,
    handleSearch,
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(serviceData?.data ?? [], pageSize);

  const onEditItem = (id: string) => {
    openModal({
      view: <AddServiceForm id={id} />,
    });
  };
  return (
    <WidgetCard
      title={"Services"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button
          onClick={() =>
            openModal({
              view: <AddServiceForm />,
            })
          }
          size="lg"
          color="primary"
        >
          Add Service
        </Button>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          isLoading={serviceData.isLoading}
          data={serviceData?.data?.data}
          columns={getColumns({
            onDeleteItem: deleteCity,
            onEditItem,
          })}
          scroll={{ x: 400 }}
          //   sticky={sticky}
          variant={"modern"}
          className="mt-4"
          {...{
            paginatorOptions: {
              pageSize,
              ...{ setPageSize },
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            // paginatorClassName: cn(
            //   "mt-4 lg:mt-5",
            //   noGutter && "px-5 lg:px-7",
            //   paginatorClassName
            // ),
          }}
        />
      </div>
    </WidgetCard>
  );
};

export default ServiceList;
