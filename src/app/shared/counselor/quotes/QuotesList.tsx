"use client";

import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import React, { useState } from "react";
import { useModal } from "../../modal-views/use-modal";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Button, Title } from "rizzui";
import WidgetCard from "@/components/cards/widget-card";
import AddQuoteForm from "./add-quotes";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./quote_column";

export const CategoriesArr = ["affirmations", "facts"];
const CategoriesLabel = ["Affirmation", "Facts"];

const QuotesList = () => {
  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const quotesData = useFetchData(
    [queryKeys.getAllQuotes, pageSize, currentPage, categoryLink],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/${categoryLink}?page=${currentPage}&per_page=${pageSize}`,
    headers
  );

  if (quotesData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const onViewItem = (id: string) => {
    openModal({
      view: <AddQuoteForm id={id} categoryLink={categoryLink} isView={true} />,
      customSize: "550px",
    });
  };

  const onEditItem = (id: string) => {
    openModal({
      view: <AddQuoteForm id={id} categoryLink={categoryLink} isView={false} />,
      customSize: "550px",
    });
  };

  return (
    <article className="">
      <WidgetCard
        title={""}
        className={"flex flex-col"}
        headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
        action={
          <Button
            size="lg"
            color="primary"
            onClick={() => {
              openModal({
                view: (
                  <AddQuoteForm categoryLink={categoryLink} isView={false} />
                ),
                customSize: "550px",
              });
            }}
          >
            {categoryLink === CategoriesArr[0] ? "Add Affirmation" : "Add Fact"}
          </Button>
        }
      >
        <CustomCategoryButton
          categoryLink={categoryLink}
          setCategoryLink={setCategoryLink}
          categoriesArr={CategoriesArr}
          labels={CategoriesLabel}
        />

        <ControlledTable
          variant={"modern"}
          isLoading={quotesData.isFetching}
          showLoadingText={true}
          data={quotesData?.data?.data?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns(categoryLink, onViewItem, onEditItem)}
          paginatorOptions={{
            pageSize,
            setPageSize,
            total: quotesData?.data?.data?.total,
            current: currentPage,
            onChange: (page: number) => setCurrentPage(page),
          }}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </WidgetCard>
    </article>
  );
};

export default QuotesList;
