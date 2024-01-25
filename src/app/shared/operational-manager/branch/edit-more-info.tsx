"use client";

import React, { useEffect } from "react";
import { useFormikContext, FormikValues } from "formik";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import CustomSelect from "@/components/ui/form/selectMultiple";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { Checkbox } from "rizzui";
import FormikInput from "@/components/ui/form/input";

const EditMoreInfo = ({
  className,
  initialServices,
  initialAmenities,
  customDaysChecked,
  setCustomDaysChecked,
  initialOpeningHours,
}: {
  className?: string;
  initialServices: any[];
  initialAmenities: any[];
  customDaysChecked: any[];
  setCustomDaysChecked: React.Dispatch<React.SetStateAction<any[]>>;
  initialOpeningHours: boolean[];
}) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const headers = useGetHeaders({ type: "FormData" });

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

  useEffect(() => {
    setCustomDaysChecked(initialOpeningHours);
  }, []);

  return (
    <>
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
            defaultValue={initialServices}
            onChange={(selectedOption: any[]) => {
              setFieldValue(
                "services",
                selectedOption.map((item) => item.id)
              );
            }}
            placeholder="select Services"
            getOptionValue={(furnished: any) => furnished?.id}
            getOptionLabel={(furnished: any) => furnished?.name?.english}
            noOptionsMessage={() => "Services viewed here"}
          />
          <CustomSelect
            isSearchable
            name="amenities"
            label="Amenities"
            options={amenitiesData?.data?.data}
            defaultValue={initialAmenities}
            onChange={(selectedOption: any[]) => {
              setFieldValue(
                "amenities",
                selectedOption.map((item) => item.id)
              );
            }}
            placeholder="select Amenities"
            getOptionValue={(furnished: any) => furnished?.id}
            getOptionLabel={(furnished: any) => furnished?.name?.english}
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
            <div className="flex items-end  gap-2 w-full " key={index}>
              <Checkbox
                checked={customDaysChecked[index]}
                variant="flat"
                color="primary"
                className="font-medium"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const newChecked = [...customDaysChecked];

                  newChecked[index] = isChecked;

                  if (customDaysChecked) {
                    console.log("newChecked ----> ", newChecked);
                    setCustomDaysChecked([...newChecked]);
                  }
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
                type="time"
                color="primary"
              />
              <FormikInput
                name={`openingHours[${index}].to`}
                label="Closing Time"
                type="time"
                color="primary"
                disabled={!customDaysChecked[index]}
              />
            </div>
          ))}
        </div>
      </FormGroup>
    </>
  );
};

export default EditMoreInfo;
