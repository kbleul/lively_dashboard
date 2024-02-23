//starting from "06:00 am" and ending with "05:00 am"
export const getTimeAxis = (
  sliceValues: { from: number; to: number } = { from: 8, to: 12 }
): string[] => {
  const TimeAxis = [];

  let currentTime = 0;

  for (let i = 0; i < 24; i++) {
    let formattedTime =
      currentTime.toString().padStart(2, "0") +
      ":00 " +
      (currentTime >= 12 ? "pm" : "am");

    TimeAxis.push(formattedTime);

    currentTime = (currentTime + 1) % 24;
  }

  return TimeAxis.slice(sliceValues.from, sliceValues.to);
};

export const filterViewedSchedule = (
  allSchedule: any[],
  monthToView: string,
  yearToView: number
): any[] => {
  const filterdApponintments = allSchedule.filter((schedul: any) => {
    const appointmentDate = new Date(schedul.date);
    const appointmentMonth = appointmentDate.toLocaleString("en-US", {
      month: "long",
    });

    return (
      schedul.date.includes(yearToView.toString()) &&
      appointmentMonth === monthToView
    );
  });

  return [...filterdApponintments];
};

const validateTimeSpan = (
  viewedTimeSet: { from: number; to: number },
  type: "BACK" | "FORWARD"
) => {
  if (type === "BACK") {
    if (viewedTimeSet.from <= 0 || viewedTimeSet.to <= 4) {
      return false;
    }

    return true;
  }

  if (type === "FORWARD") {
    if (viewedTimeSet.from >= 20 || viewedTimeSet.to >= 24) {
      return false;
    }

    return true;
  }
};

export const handleBackTimeSpan = (
  viewedTimeSet: {
    from: number;
    to: number;
  },
  setViewedTimeSet: React.Dispatch<
    React.SetStateAction<{
      from: number;
      to: number;
    }>
  >
) => {
  if (!validateTimeSpan(viewedTimeSet, "BACK")) {
    return;
  }

  setViewedTimeSet({ from: viewedTimeSet.from - 4, to: viewedTimeSet.to - 4 });
};

export const handleForwardTimeSpan = (
  viewedTimeSet: {
    from: number;
    to: number;
  },
  setViewedTimeSet: React.Dispatch<
    React.SetStateAction<{
      from: number;
      to: number;
    }>
  >
) => {
  if (!validateTimeSpan(viewedTimeSet, "FORWARD")) {
    return;
  }

  setViewedTimeSet({ from: viewedTimeSet.from + 4, to: viewedTimeSet.to + 4 });
};

export const getMaxDaysInMonth = (): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Create a new Date object for the current year and month
  const targetDate = new Date(currentYear, currentMonth, 1);

  // Get the maximum number of days in the current month
  const maxDaysInMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0
  ).getDate();
  return maxDaysInMonth;
};

export const getDateDayMap = () => {
  const maxDaysInMonth = getMaxDaysInMonth();

  const today = new Date();

  const todayDayOfMonth = today.getDate();

  if (todayDayOfMonth <= 7) {
    return maxDaysInMonth <= 28 ? 4 : 5;
  } else if (todayDayOfMonth <= 14) {
    return maxDaysInMonth <= 28 ? 3 : 4;
  } else if (todayDayOfMonth <= 21) {
    return maxDaysInMonth <= 28 ? 2 : 3;
  } else if (todayDayOfMonth <= 28) {
    return maxDaysInMonth <= 28 ? 1 : 2;
  } else {
    return maxDaysInMonth <= 28 ? 0 : 1;
  }
};
