import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import {
  compareTimeBetweenIntervals,
  getTimeAxis,
  handleBackTimeSpan,
  handleForwardTimeSpan,
  isTimeGreater,
} from "./util";
import AppointmentCard from "./AppointmentCard";

const checkDateTime = (
  dateNumber: number | string,
  viewedScheduleArr?: any[],
  currentDay?: string,
  time?: string
): JSX.Element => {
  if (!viewedScheduleArr || !currentDay || !time) {
    return <></>;
  }

  const timeWithoutSuffix = time.split(" ")[0]; //remove am pm

  const appointment = viewedScheduleArr.find((app) => {
    return isTimeGreater(timeWithoutSuffix + ":00", app.time);
  });

  let day: any = "";
  let dayOfMonth = 0;
  let dayOfWeek = "";

  if (appointment && appointment.date) {
    const date = new Date(appointment.date);
    // eslint-disable-next-line
    dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    // eslint-disable-next-line
    day = date.toLocaleString("en-US");
    dayOfMonth = date.getDate();
  }

  // const isDateBretween = (apponintmentDate: string) => {
  //   if (typeof dateNumber === "string") {
  //     dateNumber = parseInt(dateNumber);
  //   }
  //   console.log(dayOfMonth);
  //   const appointmentDateNumber = parseInt(
  //     apponintmentDate.split("-")[apponintmentDate.split("-").length - 1]
  //   );
  //   if (
  //     dateNumber >= appointmentDateNumber &&
  //     appointmentDateNumber >= dayOfMonth
  //   ) {
  //     return true;
  //   }

  //   return false;
  // };
  return (
    <div className="my-2 h-[12vh] ">
      {appointment && dayOfWeek === currentDay && (
        // isDateBretween(appointment.date) &&
        // <p>{"day " + day + " current" + currentDay}</p>
        <AppointmentCard appointment={appointment} />
      )}
    </div>
  );
};

const HoursList = ({
  viewedScheduleArr,
  viewedTimeSet,
  setViewedTimeSet,
  currentDay,
  showTime,
  dateNumber,
  className,
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
  viewedScheduleArr?: any[];
  currentDay?: string;
  showTime?: boolean;
  dateNumber?: number | string;
  className?: { container?: string; para?: string };
}) => {
  return (
    <article
      className={
        className && className.container ? className?.container : "flex w-full "
      }
    >
      {showTime && (
        <section className="flex justify-between items-center mb-4">
          <button
            className="w-8 py-2 mr-4 border bg-gray-100 hover:bg-gray-200  rounded-lg flex justify-center items-center"
            onClick={() => handleBackTimeSpan(viewedTimeSet, setViewedTimeSet)}
          >
            <IoChevronBackSharp size={14} />
          </button>
          <button
            className="w-8 py-2 mr-2 border bg-gray-100 hover:bg-gray-200  rounded-lg flex justify-center items-center "
            onClick={() =>
              handleForwardTimeSpan(viewedTimeSet, setViewedTimeSet)
            }
          >
            <IoChevronForwardSharp size={14} />
          </button>
        </section>
      )}

      <section className="flex w-full">
        {getTimeAxis({ ...viewedTimeSet }).map((time) => (
          <div
            key="time"
            className={
              className && className.para
                ? className?.para
                : "w-1/4 h-[14vh] border border-dashed px-2"
            }
          >
            {showTime ? (
              <p>{time}</p>
            ) : (
              checkDateTime(
                dateNumber ? dateNumber : 0,
                viewedScheduleArr,
                currentDay,
                time
              )
            )}
          </div>
        ))}
      </section>
    </article>
  );
};

export default HoursList;
