import React from "react";
import Select, { StylesConfig } from "react-select";
import { MonthOptions } from "./data";

const CalanderMainHeader = ({
  selectedMonth,
  selectedYear,
  filterByMonth,
}: {
  selectedMonth: string;
  selectedYear: number;
  filterByMonth: (selectedMonth: string) => void;
}) => {
  const defaultValue =
    MonthOptions.find((option) => option.value === selectedMonth) ||
    MonthOptions[0];

  return (
    <article className="border-b py-3  flex gap-4 justify-center">
      <Select
        name={""}
        options={MonthOptions}
        isMulti={false}
        defaultValue={defaultValue}
        isSearchable={true}
        placeholder={""}
        onChange={(option) => option && filterByMonth(option?.value)}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        className="w-36 font-medium"
      />
      <Select
        name={""}
        options={MonthOptions}
        isMulti={false}
        defaultValue={defaultValue}
        isSearchable={true}
        placeholder={""}
        onChange={(option) => option && filterByMonth(option?.value)}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        className="w-22 font-medium"
      />
    </article>
  );
};

export default CalanderMainHeader;
