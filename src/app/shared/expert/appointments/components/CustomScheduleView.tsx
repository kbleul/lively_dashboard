"use client";

import { DaysAxis } from "./data";
import HoursList from "./HoursList";
import CalanderTimeHeader from "./CalanderTimeHeader";
import CalanderMainHeader from "./CalanderMainHeader";
import { useState } from "react";
import { filterViewedSchedule, getDateDayMap, getMaxDaysInMonth } from "./util";

const CustomScheduleView = ({
  apponintmentsList,
}: {
  apponintmentsList: any[];
}) => {
  const today = new Date();

  // Get the day of the month
  const todayDayOfMonth = today.getDate();

  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });

  const firstAppointmentDate = apponintmentsList[0]
    ? new Date(apponintmentsList[0].date)
    : new Date("1998-01-01");

  const firstAppointmentMonth = firstAppointmentDate.toLocaleString("en-US", {
    month: "long",
  });
  const firstAppointmentYear = firstAppointmentDate.getFullYear();

  const [viewedWeek, setViewedWeek] = useState(0);
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

  let dareee = 0;
  let index = 0;
  let loopindex = 0;

  const getDateNumber = (
    loopCounter: number,
    isStart: boolean,
    currentIndex: number,
    todayDayOfMonth: number
  ) => {
    const maxMonth = getMaxDaysInMonth();

    if (loopCounter === 0 && isStart) {
      if (todayDayOfMonth < maxMonth) {
        dareee = todayDayOfMonth;
        index = currentIndex;
        loopindex = loopCounter;

        return todayDayOfMonth;
      }
    }

    if (loopCounter > loopindex) {
      if (dareee < maxMonth) {
        ++dareee;

        return dareee;
      }
    }

    if (currentIndex > index && dareee >= todayDayOfMonth) {
      if (dareee < maxMonth) {
        ++dareee;

        return dareee;
      }
    }

    dareee = 0;
    index = 0;
    loopindex = 0;

    return "";
  };

  const renderDays = (loopCounter: number) => {
    return (
      <>
        {" "}
        {DaysAxis.map((day, index) => (
          <article
            key={day + "---days---" + index}
            className="flex justify-start gap-x-4 "
          >
            <p className="w-[5%] text-center pt-4 text-sm font-medium">
              {getDateNumber(
                loopCounter,
                day === dayOfWeek,
                index,
                todayDayOfMonth
              )}{" "}
              {day.substring(0, 3)}
            </p>

            <div className="px-4 w-full border-x">
              <HoursList
                viewedScheduleArr={viewedScheduleArr}
                viewedTimeSet={viewedTimeSet}
                setViewedTimeSet={setViewedTimeSet}
                currentDay={day}
                dateNumber={getDateNumber(
                  loopCounter,
                  day === dayOfWeek,
                  index,
                  todayDayOfMonth
                )}
              />
            </div>
          </article>
        ))}
      </>
    );
  };

  const renderedDays = Array.from({ length: getDateDayMap() }).map((_, index) =>
    renderDays(index)
  );

  return (
    <main className="border rounded-md">
      <CalanderMainHeader
        selectedMonth={firstAppointmentMonth}
        selectedYear={firstAppointmentYear}
        filterByMonth={filterByMonth}
        viewedWeek={viewedWeek}
        setViewedWeek={setViewedWeek}
        weeksLength={renderedDays.length}
      />

      <CalanderTimeHeader
        viewedTimeSet={viewedTimeSet}
        setViewedTimeSet={setViewedTimeSet}
      />

      {renderedDays[viewedWeek]}
    </main>
  );
};

export default CustomScheduleView;
