/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import FormGroup, { FormBlockWrapper } from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import { toast } from "sonner";
import * as Yup from "yup";
import { Checkbox } from "@/components/ui/checkbox";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { workCustomDays } from "@/constants/form-constants";
import { appendDefaultSecond } from "@/utils/append-second";
import { useQueryClient } from "@tanstack/react-query";
import { DaysAxis } from "../appointments/components/data";
import { Input, Title } from "rizzui";
import Spinner from "@/components/ui/spinner";
import { GoPlusCircle } from "react-icons/go";

const ExpertAvailability = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });

  const [selectedDayofWeek, setSelectedDayofWeek] = useState(DaysAxis[0]);
  const [startingTime, setStartingTime] = useState<string | null>(null);
  const [endingTime, setEndingTime] = useState<string | null>(null);
  const [addTimes, setAddedTimes] = useState<
    { startingTime: string; endingTime: string }[]
  >([]);

  const [customDaysChecked, setCustomDaysChecked] = useState(
    Array(7).fill(false)
  );
  const schema = Yup.object().shape({
    openingHours: Yup.array().of(
      Yup.object().shape({
        day: Yup.string().min(1).required("Day is required"),
        from: Yup.string().min(1).required("From is required"),
        to: Yup.string().min(1).required("To is required"),
      })
    ),
  });

  const expertAvialbility = useFetchData(
    [queryKeys.getAvialabilityDays],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/expert-availabilities`,
    headers
  );

  const updateAvailability = async (values: any) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/expert-availabilities`,
        method: "POST",
        headers,
        body: {
          availabilities: values.openingHours
            .map((hours: any) => ({
              day_of_week: hours.day,
              opening_time: appendDefaultSecond(hours.from),
              closing_time: appendDefaultSecond(hours.to),
            }))
            .filter((_: unknown, index: number) => customDaysChecked[index]),
          // _method: "PATCH",
        },
        onSuccess: () => {
          toast.success("Availability Updated Successfully");
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAvialabilityDays],
          });
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const initialValues = {
    openingHours: workCustomDays[0],
    from: workCustomDays[0].from,
    to: workCustomDays[0].to,
  };
  console.log(expertAvialbility?.data?.data);
  const expertAvialbleTime = expertAvialbility?.data?.data;

  console.log(expertAvialbleTime);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={updateAvailability}
    >
      {({ values }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            <FormBlockWrapper
              title={"Availability Time."}
              description={"Add Availability Time from here"}
              className="py-7 @2xl:pt-9 @3xl:pt-11"
            >
              {expertAvialbility.isFetched && !expertAvialbility.isFetching ? (
                <div className="col-span-2">
                  <section className="flex justify-start gap-4  flex-wrap mb-8">
                    {DaysAxis.map((day, index) => (
                      <button
                        onClick={() =>
                          day !== selectedDayofWeek && setSelectedDayofWeek(day)
                        }
                        key={"appdayskey" + day + index}
                        type="button"
                        className={
                          selectedDayofWeek === day
                            ? "border rounded-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
                            : "border rounded-full px-4 py-2 font-medium"
                        }
                      >
                        {day}
                      </button>
                    ))}
                  </section>

                  <section className="flex justify-start gap-4  flex-wrap mb-8">
                    {expertAvialbleTime
                      .filter(
                        (avTime: any) =>
                          avTime.day_of_week === selectedDayofWeek
                      )
                      .map((day: any) => (
                        <button
                          key={"addedAppkey" + day.id}
                          type="button"
                          className="border bg-gray-100 rounded-md px-4 py-2"
                        >
                          {day.opening_time + " - " + day.closing_time}
                        </button>
                      ))}

                    {addTimes.map((time, index: number) => (
                      <button
                        key={
                          "addedtimeAppkey" +
                          time.startingTime +
                          time.endingTime
                        }
                        type="button"
                        className="border bg-white rounded-md px-4 py-2"
                      >
                        {time.startingTime + " - " + time.endingTime}
                      </button>
                    ))}
                  </section>

                  <section className="shadow-md p-4 mt-4 border-t rounded-md">
                    <Title as="h4" className="mt-4 mb-8 font-normal border-b">
                      Add a new appointment slot for {selectedDayofWeek}
                    </Title>

                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        autoComplete="off"
                        // @ts-ignore
                        type="time"
                        label={"Starting Time"}
                        name={"name"}
                        onChange={(e) =>
                          setStartingTime(e.target.value + ":00")
                        }
                      />
                      <Input
                        autoComplete="off"
                        // @ts-ignore
                        type="time"
                        label={"Ending Time"}
                        name={"name"}
                        onChange={(e) => setEndingTime(e.target.value + ":00")}
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (startingTime && endingTime) {
                          setAddedTimes((prev) => [
                            ...prev,
                            { startingTime, endingTime },
                          ]);

                          setStartingTime(null);
                          setEndingTime(null);
                        }
                      }}
                    >
                      <GoPlusCircle />
                    </button>

                    <button className=""></button>
                  </section>
                </div>
              ) : (
                <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
                  <Spinner size="lg" />
                </div>
              )}
            </FormBlockWrapper>
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Update Avilability"}
            showSveBtn={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ExpertAvailability;
