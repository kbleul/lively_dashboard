import WidgetCard from "@/components/cards/widget-card";
import ControlledTable from "@/components/controlled-table";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useFetchData } from "@/react-query/useFetchData";
import { getColumns } from "./history_columns";
import { queryKeys } from "@/react-query/query-keys";
import ViewFeedbackModal from "./view-feedback-modal";

const AppointmentsHistory = ({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(10);

  const appointments = useFetchData(
    [
      queryKeys.getAppointmentsHistory + clientId,
      clientId,
      currentPage,
      pageSize,
    ],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/client-appointment-histories/${clientId}`,
    headers
  );

  const viewFeedback = (appointmentId: string) => {
    openModal({
      view: <ViewFeedbackModal appointmentId={appointmentId} />,
      customSize: "500px",
    });
  };

  return (
    <article className="">
      <WidgetCard
        title={"History"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            isLoading={appointments.isLoading}
            data={appointments?.data?.data?.data}
            columns={getColumns(viewFeedback)}
            scroll={{ x: 400 }}
            variant={"modern"}
            className="mt-4"
            paginatorOptions={{
              pageSize,
              setPageSize,
              total: appointments?.data?.data?.total,
              current: currentPage,
              onChange: (page: number) => setCurrentPage(page),
            }}
          />
        </div>
      </WidgetCard>
    </article>
  );
};

export default AppointmentsHistory;
