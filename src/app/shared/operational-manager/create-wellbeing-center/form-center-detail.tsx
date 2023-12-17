"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";

const CenterDetailForm = ({ className }: { className?: string }) => {
  return (
    <FormGroup
      title="Center detail"
      description="Edit your center detail from here"
      className={cn(className)}
    >
      <FormikInput
        name="nameEn"
        label="English Name"
        placeholder="Enter Cnter English Name"
        color="primary"
      />
      <FormikInput
        name="nameAm"
        label="Amharic Name"
        placeholder="Enter Cnter Amharic Name"
        color="primary"
      />
      <FormikInput
        name="descriptionEn"
        label="English Description"
        placeholder="Enter Cnter English Description"
        color="primary"
        className="col-span-2"
      />
      <FormikInput
        name="descriptionAm"
        label="Amharic Description"
        placeholder="Enter Cnter Amharic Description"
        color="primary"
        className="col-span-2"
      />
      <FormikInput
        name="phoneNumber"
        label="Phone Number"
        prefix="+251"
        type="number"
        placeholder="9*******"
        color="primary"
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default CenterDetailForm;
