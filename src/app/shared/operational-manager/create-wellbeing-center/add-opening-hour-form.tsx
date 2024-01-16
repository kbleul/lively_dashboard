"use client";
import { useFormikContext, FormikValues } from "formik";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
const AddOpeninHourForm = ({ className }: { className?: string }) => {
  const [customDaysChecked, setCustomDaysChecked] = React.useState(
    Array(7).fill(false)
  );
  const { values } = useFormikContext<FormikValues>();

  return (
    <FormGroup
      title="Working Days & Hours"
      description="Edit your working days & hours from here"
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
  );
};

export default AddOpeninHourForm;
