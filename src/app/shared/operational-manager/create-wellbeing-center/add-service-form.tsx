"use client";

import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/components/icons/trash";
import { ActionIcon } from "@/components/ui/action-icon";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import { FieldArray, FormikValues, useFormikContext } from "formik";
export default function AddServiceForm({ className }: { className?: string }) {
  const services = [
    {
      serviceEnglish: "",
      serviceAmharic: "",
    },
  ];

  const { values } = useFormikContext<FormikValues>();
  return (
    <FormGroup
      title="Services "
      description="Add the service here. "
      className={cn(className)}
    >
      <FieldArray name={`services`}>
        {({ push, remove }) => (
          <div className="w-full flex flex-col items-start space-y-2 col-span-2">
            {values.services.map((_: any, i: number) => (
              <div
                key={i}
                className="border p-2 rounded-md grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
              >
                <div className="md:col-span-2">
                  <Text as="span" className="text-primary block capitalize">
                    Service {i + 1}
                  </Text>
                </div>
                <FormikInput
                  name={`services.${i}.serviceEnglish`}
                  label="service English"
                  placeholder="Enter Service English Name"
                  className="col-span-2"
                  color="primary"
                />

                <FormikInput
                  name={`services.${i}.serviceAmharic`}
                  label="serviceAmharic"
                  placeholder="Enter Service Amharic Name"
                  className="col-span-2"
                  color="primary"
                />

                {i > 0 && (
                  <div className="md:col-span-2 w-full flex items-end justify-end">
                    <ActionIcon
                      onClick={() => remove(i)}
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20 mt-1"
                    >
                      <PiTrashBold className="w-6" />
                    </ActionIcon>
                  </div>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              color="primary"
              onClick={() => push({ serviceEnglish: "", titleAmharic: "" })}
            >
              Add Service
            </Button>
          </div>
        )}
      </FieldArray>
    </FormGroup>
  );
  {
    /* <Button
    variant="outline"
    className="col-span-full ml-auto w-auto"
  >
    <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
  </Button> */
  }
}
