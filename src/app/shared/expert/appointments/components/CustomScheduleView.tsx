"use client";

import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import { DaysAxis } from "./data";
import HoursList from "./HoursList";
import CalanderTimeHeader from "./CalanderTimeHeader";
import CalanderMainHeader from "./CalanderMainHeader";
import { useState } from "react";
import { filterViewedSchedule } from "./util";

const CustomScheduleView = ({
  apponintmentsList,
}: {
  apponintmentsList: any[];
}) => {
  const firstAppointmentDate = new Date(apponintmentsList[0].date);

  const firstAppointmentMonth = firstAppointmentDate.toLocaleString("en-US", {
    month: "long",
  });
  const firstAppointmentYear = firstAppointmentDate.getFullYear();

  const lastAppointmentDate = new Date(
    apponintmentsList[apponintmentsList.length - 1].date
  );

  const lastAppointmentMonth = firstAppointmentDate.toLocaleString("en-US", {
    month: "long",
  });
  const lastAppointmentYear = firstAppointmentDate.getFullYear();

  //   // Get the day of the week as a string
  //   const firstAppointment = date.toLocaleString("en-US", { weekday: "long" });

  console.log(firstAppointmentMonth); // Output: February
  console.log(firstAppointmentYear); // Output: Tuesday
  console.log(lastAppointmentMonth); // Output: February
  console.log(lastAppointmentYear); // Output: Tuesday
  //console.log({ apponintmentsList });

  const [viewedScheduleArr, setViewedScheduleArr] = useState([
    ...filterViewedSchedule(
      apponintmentsList,
      firstAppointmentMonth,
      firstAppointmentYear
    ),
  ]);

  const [viewedTimeSet, setViewedTimeSet] = useState<{
    from: number;
    to: number;
  }>({ from: 8, to: 12 });

  const filterByMonth = (selectedMonth: string) => {
    setViewedScheduleArr([
      ...filterViewedSchedule(
        apponintmentsList,
        selectedMonth,
        firstAppointmentYear
      ),
    ]);

    setViewedTimeSet({ from: 8, to: 12 });
  };

  return (
    <main className="border rounded-md">
      <CalanderMainHeader
        selectedMonth={firstAppointmentMonth}
        selectedYear={firstAppointmentYear}
        filterByMonth={filterByMonth}
      />

      <CalanderTimeHeader
        viewedTimeSet={viewedTimeSet}
        setViewedTimeSet={setViewedTimeSet}
      />

      {DaysAxis.map((day, index) => (
        <article
          key={day + "---days---" + index}
          className="flex justify-start gap-x-4 "
        >
          <p className="w-[5%] text-center pt-4 text-lg font-medium">
            {day.substring(0, 3)}
          </p>

          <div className="px-4 w-full border-x">
            <HoursList
              viewedScheduleArr={viewedScheduleArr}
              viewedTimeSet={viewedTimeSet}
              setViewedTimeSet={setViewedTimeSet}
              currentDay={day}
            />
          </div>
        </article>
      ))}
    </main>
  );
};

export default CustomScheduleView;
