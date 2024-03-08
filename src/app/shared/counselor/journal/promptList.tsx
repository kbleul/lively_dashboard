"use client";

import WidgetCard from "@/components/cards/widget-card";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import { Title } from "rizzui";
import { Button } from "@/components/ui/button";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./columns";
import { useModal } from "../../modal-views/use-modal";
import AddJournal from "./add-journal-modal";

const PromptsList = () => {
  const headers = useGetHeaders({ type: "Json" });
  const { openModal } = useModal();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const promptsData = useFetchData(
    [queryKeys.getAllJournalPrompts, pageSize, currentPage],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/journal-prompts`,
    headers
  );

  if (
    promptsData?.isFetching ||
    promptsData?.isLoading ||
    promptsData.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const deleteProduct = async (id: string) => {
    console.log(id);
  };

  const handleEdit = (id: string, isView = false) => {
    openModal({
      view: <AddJournal id={id} isView={isView} />,
      customSize: "550px",
    });
  };

  return (
    <>
      <WidgetCard
        title={"Journal Prompts"}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <Button
            size="lg"
            color="primary"
            onClick={() => {
              openModal({
                view: <AddJournal isView={false} />,
                customSize: "550px",
              });
            }}
          >
            Add Prompt
          </Button>
        }
      >
        <div className={"table-wrapper flex-grow"}>
          <ControlledTable
            variant={"modern"}
            isLoading={promptsData.isFetching}
            showLoadingText={true}
            data={promptsData?.data?.data}
            scroll={{ x: 900 }}
            // @ts-ignore
            columns={getColumns({ deleteProduct, handleEdit })}
            paginatorOptions={{
              pageSize: 1,
              setPageSize,
              total: 0,
              current: 1,
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

export default PromptsList;
