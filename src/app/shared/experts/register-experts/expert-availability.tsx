/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { FormBlockWrapper } from "@/components/form-group";
import { toast } from "sonner";

import useDynamicMutation from "@/react-query/usePostData";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";

import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Title } from "rizzui";
import { GoPlusCircle } from "react-icons/go";
import {
  addHour,
  isValidTime,
  isValidTimeStatus,
} from "@/utils/time_manuplation";
import cn from "@/utils/class-names";
import { MdOutlineCancel } from "react-icons/md";
import { DaysAxis } from "../../expert/appointments/components/data";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";

const ExpertAvailability = ({
  userId,
  name,
  className,
}: {
  userId: string;
  name: string | null;
  className?: string;
}) => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const router = useRouter();
  const headers = useGetHeaders({ type: "Json" });

  const [selectedDayofWeek, setSelectedDayofWeek] = useState(DaysAxis[0]);
  const [startingTime, setStartingTime] = useState<string | null>(null);
  const [endingTime, setEndingTime] = useState<string | null>(null);

  const [timeError, setTimeError] = useState<string | null>(null);

  const [savedAppointments, setSavedAppointments] = useState<
    {
      id: string;
      day_of_week: string;
      opening_time: string;
      closing_time: string;
    }[]
  >([]);

  const [addedTimes, setAddedTimes] = useState<
    { startingTime: string; endingTime: string }[]
  >([]);

  const updateAvailability = async () => {
    try {
      let newAppointments = addedTimes.flatMap((addedTimes) => {
        return {
          opening_time: addedTimes.startingTime,
          closing_time: addedTimes.endingTime,
        };
      });

      if (savedAppointments && savedAppointments.length > 0) {
        newAppointments = [
          ...savedAppointments
            .filter((appTime) => appTime.day_of_week === selectedDayofWeek)
            .flatMap((timeslot) => {
              return {
                opening_time: timeslot.opening_time,
                closing_time: timeslot.closing_time,
              };
            }),
          ...newAppointments,
        ];
      }

      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/expert-availabilities/${userId}`,
        method: "POST",
        headers,
        body: {
          day_of_week: selectedDayofWeek,
          availabilities: newAppointments,
          // _method: "PATCH",
        },
        onSuccess: () => {
          toast.success("Availability Updated Successfully");
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAvialabilityDays],
          });

          setAddedTimes([]);
          setStartingTime(null);
          setEndingTime(null);
          setTimeError(null);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeAppointment = (appointmentId: string) => {
    setSavedAppointments((prev) =>
      prev.filter((appoint) => appoint.id !== appointmentId)
    );
  };

  const removeAddedAppointment = (index: number) => {
    const tempArr = addedTimes;

    tempArr.splice(index, 1);

    setAddedTimes([...tempArr]);
  };

  const handleAddNewSlot = () => {
    let timesSlots = savedAppointments
      .filter((appTime: any) => appTime.day_of_week === selectedDayofWeek)
      .flatMap((slot: any) => slot.opening_time + " - " + slot.closing_time);
    timesSlots = [
      ...timesSlots,
      ...addedTimes.flatMap(
        (slot: any) => slot.startingTime + " - " + slot.endingTime
      ),
    ];

    if (startingTime && endingTime) {
      const isvalid = isValidTime(
        timesSlots,
        startingTime + " - " + endingTime
      );

      if (isvalid.status === isValidTimeStatus.ALLOWED.status) {
        setAddedTimes((prev) => [...prev, { startingTime, endingTime }]);

        setStartingTime(null);
        setEndingTime(null);
        setTimeError(null);

        return;
      }

      setTimeError(isvalid.msg);
    }
  };

  const handleChangeTime = (timeString: string) => {
    let timesSlots = savedAppointments
      .filter((appTime: any) => appTime.day_of_week === selectedDayofWeek)
      .flatMap((slot: any) => slot.opening_time + " - " + slot.closing_time);

    timesSlots = [
      ...timesSlots,
      ...addedTimes.flatMap(
        (slot: any) => slot.startingTime + " - " + slot.endingTime
      ),
    ];

    const endTime = addHour(timeString, 1);

    if (
      isValidTime(timesSlots, timeString + ":00" + " - " + endTime + ":00")
        .status === isValidTimeStatus.ALLOWED.status
    ) {
      setStartingTime(timeString + ":00");
      setEndingTime(addHour(timeString, 1) + ":00");
      setTimeError(null);
    } else {
      setTimeError(
        "Time slots need to have atleast 15 min gap with the existing slots."
      );
    }
  };

  return (
    <>
      <main className="flex flex-grow flex-col @container [&_label]:font-medium">
        <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
          <FormBlockWrapper
            title={"Availability Time."}
            description={"Add Availability Time from here"}
            className="py-7 @2xl:pt-9 @3xl:pt-11"
          >
            <div className="col-span-2">
              <section className="flex justify-start gap-4  flex-wrap mb-8">
                {DaysAxis.map((day, index) => (
                  <button
                    onClick={() => {
                      if (day !== selectedDayofWeek) {
                        setStartingTime(null);
                        setEndingTime(null);
                        setTimeError(null);
                        setAddedTimes([]);

                        setSelectedDayofWeek(day);
                      }
                    }}
                    key={"appdayskey" + day + index}
                    type="button"
                    className={
                      selectedDayofWeek === day
                        ? " border rounded-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
                        : " border rounded-full px-4 py-2 font-medium"
                    }
                  >
                    {day}
                  </button>
                ))}
              </section>

              <section className="flex justify-start gap-4  flex-wrap mb-8">
                {savedAppointments
                  .filter(
                    (appTime) => appTime.day_of_week === selectedDayofWeek
                  )
                  .map((day) => (
                    <div className="relative" key={"addedAppkey" + day.id}>
                      <button
                        type="button"
                        className="relative border bg-gray-100 rounded-md px-4 py-2"
                      >
                        {day.opening_time + " - " + day.closing_time}
                      </button>
                      <button
                        className="absolute rounded-full bg-white hover:bg-gray-50"
                        style={{
                          top: -10,
                          right: -7,
                        }}
                        onClick={() => removeAppointment(day.id)}
                      >
                        <MdOutlineCancel />
                      </button>
                    </div>
                  ))}

                {addedTimes.map((time, index: number) => (
                  <div
                    className="relative"
                    key={
                      "addedtimeAppkey" + time.startingTime + time.endingTime
                    }
                  >
                    <button
                      type="button"
                      className="border bg-white rounded-md px-4 py-2"
                    >
                      {time.startingTime + " - " + time.endingTime}
                    </button>
                    <button
                      className="absolute rounded-full bg-white hover:bg-gray-50"
                      style={{
                        top: -10,
                        right: -7,
                      }}
                      onClick={() => removeAddedAppointment(index)}
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                ))}
              </section>

              <section className=" p-4 mt-4 border-t rounded-md">
                <Title as="h4" className="mt-4 mb-8 font-normal ">
                  Add a new appointment slot for {selectedDayofWeek}
                </Title>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <Input
                    autoComplete="off"
                    className="w-full"
                    type="time"
                    label={"Starting Time"}
                    name={"name"}
                    value={startingTime ? startingTime : ""}
                    onChange={(e) => handleChangeTime(e.target.value)}
                  />
                  <Input
                    autoComplete="off"
                    className="w-full"
                    type="time"
                    label={"Ending Time"}
                    name={"name"}
                    disabled
                    value={endingTime ? endingTime : ""}
                    onChange={(e) => setEndingTime(e.target.value + ":00")}
                  />
                </div>
                {timeError && (
                  <p className="text-red-500 mt-3 text-right">* {timeError}</p>
                )}

                <div className="mt-4 w-full flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleAddNewSlot}
                    className="flex gap-2 items-center font-semibold border rounded-md border-x-gray-200 px-6 py-2 mt-6"
                  >
                    <GoPlusCircle size={20} className="" />
                    <p>Add time slot</p>
                  </button>
                </div>
              </section>
            </div>
          </FormBlockWrapper>
        </div>

        <div
          className={cn(
            "sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10"
          )}
        >
          <Button
            type="button"
            isLoading={postMutation.isPending}
            color="primary"
            onClick={() => router.push(routes.counselor.experts.list)}
            className="w-full @xl:w-auto bg-white text-black border border-black px-5 hover:text-white hover:border-none dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            Exit
          </Button>

          <Button
            type="button"
            isLoading={postMutation.isPending}
            color="primary"
            onClick={updateAvailability}
            className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            Update Availablity
          </Button>
        </div>
      </main>
    </>
  );
};

export default ExpertAvailability;
