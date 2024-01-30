/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Formik, Form } from "formik";
import React, { useEffect } from "react";
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
const ExpertAvailability = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [customDaysChecked, setCustomDaysChecked] = React.useState(
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

  useEffect(() => {
    const standardWeekDayIndices: Record<string, number> = {};
    expertAvialbility?.data?.data
      ?.map((data: { day_of_week: string }) => data.day_of_week)
      .forEach((day: string, index: number) => {
        standardWeekDayIndices[day] = index;
      });
    const values = Object.values(standardWeekDayIndices);
    const newArray = [...customDaysChecked];
    values.forEach((index) => {
      if (index >= 0 && index < newArray.length) {
        newArray[index] = true;
      }
    });
    setCustomDaysChecked(newArray);
  }, [expertAvialbility.status]);
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
    openingHours:
      expertAvialbility?.data?.data?.length > 0
        ? expertAvialbility?.data?.data
        : workCustomDays,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={updateAvailability}
    >
      {({ errors, setFieldValue, values }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            <FormBlockWrapper
              title={"Availability Time."}
              description={"Edit Availability Time from here"}
              className="py-7 @2xl:pt-9 @3xl:pt-11"
            >
              {expertAvialbility.isFetched && !expertAvialbility.isFetching ? (
                <div className="col-span-2">
                  {values.openingHours.map((_: any, index: number) => (
                    <div className="flex items-end  gap-2 w-full " key={index}>
                      <Checkbox
                        checked={customDaysChecked[index]}
                        variant="flat"
                        color="primary"
                        className="font-medium"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setCustomDaysChecked((prevChecked) => {
                            const newChecked = [...prevChecked];
                            newChecked[index] = isChecked;
                            return newChecked;
                          });
                        }}
                      />

                      <FormikInput
                        name={`openingHours[${index}].day`}
                        label="Day"
                        disabled
                        color="primary"
                      />
                      <FormikInput
                        name={`openingHours[${index}].from`}
                        label="Opening Time"
                        disabled={!customDaysChecked[index]}
                        type="time24"
                        color="primary"
                      />
                      <FormikInput
                        name={`openingHours[${index}].to`}
                        label="Closing Time"
                        type="time24"
                        color="primary"
                        disabled={!customDaysChecked[index]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>Loading...</>
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
