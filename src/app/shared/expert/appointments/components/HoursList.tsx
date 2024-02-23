import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { getTimeAxis, handleBackTimeSpan, handleForwardTimeSpan } from "./util";
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

  const timeWithoutSuffix = time.split(" ")[0] + ":00";
  const appointment = viewedScheduleArr.find((app) =>
    app.time.includes(timeWithoutSuffix)
  );

  let day: any = "";
  let dayOfMonth = 0;

  if (appointment && appointment.date) {
    const date = new Date(appointment.date);
    dayOfMonth = date.getDate();

    day = date.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" });
    // dateNumber !== 0 && console.log(dateNumber == dayOfMonth);
  }

  const isDateBretween = (apponintmentDate: string) => {
    if (typeof dateNumber === "string") {
      dateNumber = parseInt(dateNumber);
    }

    const appointmentDateNumber = parseInt(
      apponintmentDate.split("-")[apponintmentDate.split("-").length - 1]
    );
    if (
      dateNumber >= appointmentDateNumber &&
      appointmentDateNumber >= dayOfMonth
    ) {
      return true;
    }

    return false;
  };
  return (
    <>
      {appointment &&
        day === currentDay &&
        isDateBretween(appointment.date) && (
          <AppointmentCard appointment={appointment} />
        )}
    </>
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
                : "w-1/4 h-[10vh] border border-dashed"
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
