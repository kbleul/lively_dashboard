"use client";

import React from "react";
import WidgetCard from "@/components/cards/widget-card";
import { Button } from "@/components/ui/button";
import { useTable } from "@/hooks/use-table";
import ControlledTable from "@/components/controlled-table";
import cn from "@/utils/class-names";

type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type BasicTableWidgetProps = {
  name: string;
  title?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;
  data: any[];
  enablePagination?: boolean;
  variant?: "modern" | "minimal" | "classic" | "elegant" | "retro";
  enableSearch?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;
  actionTitle?: string;
  action?: any;
  loading: boolean;
  deleteUnit: (id: string) => Promise<void>;
};

export default function CommonToolTableWidget({
  name,
  title,
  loading,
  data = [],
  getColumns,
  pageSize = 7,
  setPageSize,
  enablePagination,
  variant = "modern",
  enableSearch = true,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1300 },
  className,
  actionTitle,
  action,
  deleteUnit,
}: BasicTableWidgetProps) {
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    deleteUnit(id);
  };

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
  } = useTable(data, pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  return (
    <WidgetCard
      title={title}
      className={cn("flex flex-col", className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      action={
        <Button onClick={action} size="lg" color="primary">
          {actionTitle}
        </Button>
      }
    >
      <div
        className={cn("table-wrapper flex-grow", noGutter && "-mx-5 lg:-mx-7")}
      >
        <ControlledTable
          isLoading={loading}
          data={data}
          columns={columns}
          scroll={scroll}
          sticky={sticky}
          variant={variant}
          className="mt-4"
          {...(enablePagination && {
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            paginatorClassName: cn(
              "mt-4 lg:mt-5",
              noGutter && "px-5 lg:px-7",
              paginatorClassName
            ),
          })}
        />
      </div>
    </WidgetCard>
  );
}
