"use client";
import React from "react";
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
import AddPlaceForm from "./add-place-form";
const PlacesList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const { openModal } = useModal();
  const paymentMethods = useFetchData(
    [queryKeys.getAllPaymentMethods],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/payment-methods`,
    headers
  );

  //delet unit
  const deleteCity = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/payment-methods/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPaymentMethods],
          });
          toast.success("Payment Method Deleted Successfully");
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
  } = useTable(paymentMethods?.data ?? [], pageSize);

  const onEditItem = (id: string) => {
    openModal({
      view: <AddPlaceForm id={id} />,
    });
  };
  return (
    <Button
      onClick={() =>
        openModal({
          view: <AddPlaceForm />,

          customSize: "850px",
        })
      }
      size="lg"
      color="primary"
    >
      Create Place
    </Button>
  );
};

export default PlacesList;
