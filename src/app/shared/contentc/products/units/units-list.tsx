"use client";
import React from "react";
import { getColumns } from "../tag-unit-columns";
import { useFetchData } from "@/react-query/useFetchData";
import { Button } from "@/components/ui/button";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
// import CommonToolTableWidget from "../common/tools-table";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useTable } from "@/hooks/use-table";
import AddUnitForm from "./add-unit-form";
import { useModal } from "@/app/shared/modal-views/use-modal";
const UnitsList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const { openModal } = useModal();
  const languageData = useFetchData(
    [queryKeys.getAllUnits],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units`,
    headers
  );

  //delet unit
  const deleteCity = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllUnits],
          });
          toast.success("Unit Deleted Successfully");
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
  const { totalItems, currentPage, handlePaginate } = useTable(
    languageData?.data ?? [],
    pageSize
  );

  const onEditItem = (id: string) => {
    openModal({
      view: <AddUnitForm id={id} />,
    });
  };
  return (
    <WidgetCard
      title={"Units"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button
          onClick={() =>
            openModal({
              view: <AddUnitForm />,
            })
          }
          size="lg"
          color="primary"
        >
          Add Unit
        </Button>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          isLoading={languageData.isLoading}
          data={languageData?.data?.data}
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
          }}
        />
      </div>
    </WidgetCard>
  );
};

export default UnitsList;
