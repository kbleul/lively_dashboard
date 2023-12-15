"use client";
import React from "react";
import { getColumns as getSpecialityColumns } from "@/app/shared/content-creator/speciality/column";
import { useFetchData } from "@/react-query/useFetchData";
import { Button } from "@/components/ui/button";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useModal } from "../../modal-views/use-modal";
// import CommonToolTableWidget from "../common/tools-table";
import AddSpecilaityForm from "./add-speciality";
import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useTable } from "@/hooks/use-table";
const SpecialityList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const { openModal } = useModal();
  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `https://lively-wellbeing.unravelplc.com/api/operation-manager/specialties`,
    headers
  );

  //delet specilaity
  const deleteRequest = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `https://lively-wellbeing.unravelplc.com/api/operation-manager/specialties/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllSpecilities],
          });
          toast.success("City Deleted Successfully");
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
  } = useTable(specialityData?.data ?? [], pageSize);
  console.log("specialityData", specialityData?.data);
  return (
    <WidgetCard
      title={"Specialities"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button
          onClick={() =>
            openModal({
              view: <AddSpecilaityForm />,
              customSize: "720px",
            })
          }
          size="lg"
          color="primary"
        >
          Add Specialities
        </Button>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          isLoading={specialityData.isLoading}
          data={specialityData?.data?.data}
          columns={getSpecialityColumns({
            onDeleteItem: deleteRequest,
            name: "Specilaity",
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

export default SpecialityList;
