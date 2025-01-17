"use client";

import { useState, useMemo } from "react";

export function useColumn<T extends Record<string, any>>(columnsData: T[]) {
  const [checkedColumns, setCheckedColumns] = useState(
    columnsData.map((column) => column.dataIndex)
  );

  return { checkedColumns, setCheckedColumns };
}
