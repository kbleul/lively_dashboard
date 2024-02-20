"use client";
import React from "react";
import { getColumns } from "./columns";
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
import AddPaymentForm from "./create-payment-methods";
const PaymentMethodsList = () => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const { openModal } = useModal();
  const paymentMethods = useFetchData(
    [queryKeys.getAllPaymentMethods],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}content-creator/payment-methods`,
    headers
  );

  //delet unit
  const toggleMethod = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}content-creator/make-hidden-payment-methods/${id}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPaymentMethods],
          });
          toast.success("Payment Method Status Changed Successfully");
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
    paymentMethods?.data ?? [],
    pageSize
  );

  const onEditItem = (id: string) => {
    openModal({
      view: <AddPaymentForm id={id} />,
    });
  };
  return (
    <WidgetCard
      title={"Payment Methods"}
      className={"flex flex-col"}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button
          onClick={() =>
            openModal({
              view: <AddPaymentForm />,

              customSize: "550px",
            })
          }
          size="lg"
          color="primary"
        >
          Add Payment Method
        </Button>
      }
    >
      <div className={"table-wrapper flex-grow"}>
        <ControlledTable
          isLoading={paymentMethods.isLoading}
          data={paymentMethods?.data?.data}
          columns={getColumns({
            onToggle: toggleMethod,
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

export default PaymentMethodsList;
