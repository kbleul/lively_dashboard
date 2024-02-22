import React from "react";
import HoursList from "./HoursList";
const CalanderTimeHeader = ({
  viewedTimeSet,
  setViewedTimeSet,
}: {
  viewedTimeSet: {
    from: number;
    to: number;
  };
  setViewedTimeSet: React.Dispatch<
    React.SetStateAction<{
      from: number;
      to: number;
    }>
  >;
}) => {
  return (
    <article className="flex justify-start  gap-x-4 border-b">
      <p className="w-[5%] border-b text-center text-lg font-medium py-3">
        Date
      </p>
      <div className="px-4 w-full border-x">
        <HoursList
          viewedTimeSet={viewedTimeSet}
          setViewedTimeSet={setViewedTimeSet}
          showTime
          className={{
            container: "flex flex-col justify-between w-full px-2 py-1",
            para: "w-1/4",
          }}
        />
      </div>
    </article>
  );
};

export default CalanderTimeHeader;
