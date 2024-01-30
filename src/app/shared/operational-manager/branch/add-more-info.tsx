"use client";

import React from "react";
import { Formik, Form } from "formik";

import cn from "@/utils/class-names";

import FormFooter from "@/components/form-footer";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import { moreInfoSchema, moreInfoType } from "@/validations/branches";
import CustomSelect from "@/components/ui/form/selectMultiple";
import { workCustomDays } from "@/constants/form-constants";
import { Checkbox } from "rizzui";
import AvaterPicker from "@/components/ui/form/avater-upload";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";

const AddMoreInfo = ({
  className,
  setFormStep,
  branchId,
}: {
  className?: string;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  branchId: string;
}) => {
  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "FormData" });

  const [customDaysChecked, setCustomDaysChecked] = React.useState(
    Array(7).fill(false)
  );

  const servicesData = useFetchData(
    [queryKeys.getAllServices],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/services`,
    headers
  );

  const amenitiesData = useFetchData(
    [queryKeys.getAllAmenity],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/amenities`,
    headers
  );

  const initialValues: moreInfoType = {
    services: [],
    amenities: [],
    openingHours: workCustomDays,
  };

  const branchInfoSubmitHandler = async (values: moreInfoType) => {
    const openingHoursToSend: {
      day_of_week: string;
      opening_time: string;
      closing_time: string;
    }[] = [];

    values.openingHours.map((openHours, index) => {
      customDaysChecked[index] &&
        openingHoursToSend.push({
          day_of_week: openHours.day,
          opening_time:
            openHours.from.split(":").length < 3
              ? openHours.from + ":00"
              : openHours.from,
          closing_time:
            openHours.to.split(":").length < 3
              ? openHours.to + ":"
              : openHours.to,
        });
    });

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/add-more-branch-info/${branchId}`,
        method: "POST",
        headers,
        body: {
          services: values.services,
          amenities: values.amenities,
          opening_hours: [...openingHoursToSend],
        },
        onSuccess: (res) => {
          toast.success("Store Branch Information Saved Successfully");

          setFormStep(3);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="@container">
      <Formik
        initialValues={initialValues}
        validationSchema={moreInfoSchema}
        onSubmit={(values: moreInfoType) => branchInfoSubmitHandler(values)}
      >
        {({ errors, values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="More Branch Info."
                  description="Add your Branch information from here"
                  className={cn(className)}
                >
                  <div className="mt-4 w-full  col-span-2 flex flex-col gap-6">
                    <CustomSelect
                      isSearchable
                      name="services"
                      label="Branch services"
                      options={servicesData?.data?.data}
                      onChange={(selectedOption: any[]) => {
                        setFieldValue(
                          "services",
                          selectedOption.map((item) => item.id)
                        );
                      }}
                      placeholder="select Services"
                      getOptionValue={(furnished: any) => furnished?.id}
                      getOptionLabel={(furnished: any) =>
                        furnished?.name?.english
                      }
                      noOptionsMessage={() => "Services viewed here"}
                    />
                    <CustomSelect
                      isSearchable
                      name="amenities"
                      label="Amenities"
                      options={amenitiesData?.data?.data}
                      onChange={(selectedOption: any[]) => {
                        setFieldValue(
                          "amenities",
                          selectedOption.map((item) => item.id)
                        );
                      }}
                      placeholder="select Amenities"
                      getOptionValue={(furnished: any) => furnished?.id}
                      getOptionLabel={(furnished: any) =>
                        furnished?.name?.english
                      }
                      noOptionsMessage={() => "Amenities viewed here"}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title="Working Days & Hours"
                  description="Add your working days & hours from here"
                  className={cn(className)}
                >
                  <div className="col-span-2">
                    {values.openingHours.map((_: any, index: number) => (
                      <div
                        className="flex items-end  gap-2 w-full "
                        key={index}
                      >
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
                </FormGroup>

                <FormGroup
                  title="Business Documents"
                  description="Upload your business documents here."
                  className={cn(className)}
                >
                  <AvaterPicker
                    name="document"
                    label=""
                    className="col-span-2"
                    isDoc={true}
                  />
                  <p className="text-sm ">
                    * Accepted Formats (PDF, doc, docx)
                  </p>
                </FormGroup>
              </div>
              <FormFooter
                submitBtnText={"Save & Continue"}
                showSveBtn={false}
                isLoading={postMutation.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddMoreInfo;
