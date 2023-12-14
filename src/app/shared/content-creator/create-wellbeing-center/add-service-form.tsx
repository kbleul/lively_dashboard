"use client";

import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/components/icons/trash";
import { ActionIcon } from "@/components/ui/action-icon";
import { PiPlusBold } from "react-icons/pi";

export default function AddServiceForm() {
  const { control, register } = useFormContext();
  const services = [
    {
      serviceEnglish: "",
      serviceAmharic: "",
    },
  ];
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  console.log({ fields });
  const addCustomField = useCallback(() => append([...services]), [append]);

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="Service English Name"
            placeholder="Service English Name"
            className="flex-grow"
            {...register(`services.${index}.serviceEnglish`)}
          />
          <Input
            label="Service Amharic Name"
            placeholder="Service Amharic Name"
            className="flex-grow"
            {...register(`services.${index}.serviceAmharic`)}
          />
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
      </Button>
    </>
  );
}
