import React from "react";
import Select, { StylesConfig } from "react-select";
import { MonthOptions } from "./data";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackSharp } from "react-icons/io5";

const CalanderMainHeader = ({
  selectedMonth,
  selectedYear,
  filterByMonth,
  viewedWeek,
  setViewedWeek,
  weeksLength,
}: {
  selectedMonth: string;
  selectedYear: number;
  filterByMonth: (selectedMonth: string) => void;
  viewedWeek: number;
  setViewedWeek: React.Dispatch<React.SetStateAction<number>>;
  weeksLength: number;
}) => {
  const today = new Date();

  const todayAppointmentYear = today.getFullYear();

  const YearOptions = [
    { value: todayAppointmentYear, label: todayAppointmentYear },
    { value: todayAppointmentYear + 1, label: todayAppointmentYear + 1 },
  ];

  const defaultValue =
    MonthOptions.find((option) => option.value === selectedMonth) ||
    MonthOptions[0];

  return (
    <article className="border-b py-3 px-4  flex items-center justify-between">
      <button
        onClick={() => setViewedWeek((prev) => --prev)}
        className={
          viewedWeek === 0
            ? "text-sm font-semibold bg-white text-gray-500 py-3 px-4 rounded-lg border flex items-center justify-center"
            : "text-sm font-semibold bg-black text-white py-3 px-4 rounded-lg border flex items-center justify-center"
        }
        disabled={viewedWeek === 0}
      >
        <IoChevronBackSharp size={16} />
        Prev Week
      </button>

      <div className="flex items-center justify-center gap-2 md:gap-4">
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
          options={YearOptions}
          isMulti={false}
          defaultValue={YearOptions[0]}
          placeholder={""}
          // onChange={(option) => option && filterByMonth(option?.value)}
          getOptionLabel={(option: any) => option.label}
          getOptionValue={(option: any) => option.value}
          className="w-22 font-medium"
        />
      </div>

      <button
        onClick={() => setViewedWeek((prev) => ++prev)}
        className={
          viewedWeek === weeksLength - 1
            ? "text-sm font-semibold bg-white text-gray-500 py-3 px-4 rounded-lg border flex items-center justify-center"
            : "text-sm font-semibold bg-black text-white py-3 px-4 rounded-lg border flex items-center justify-center"
        }
        disabled={viewedWeek === weeksLength - 1}
      >
        Next Week
        <GrFormNext size={16} />
      </button>
    </article>
  );
};

export default CalanderMainHeader;
