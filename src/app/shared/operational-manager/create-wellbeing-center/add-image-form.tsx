"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import AvaterPicker from "@/components/ui/form/avater-upload";

const AddImageForm = ({ className }: { className?: string }) => {
  return (
    <FormGroup
      title="Social Media "
      description="Edit your working days & hours from here"
      className={cn(className)}
    >
      <AvaterPicker name="logo" label="Logo" className="col-span-2" />
      <AvaterPicker
        name="center_cover"
        label="Center Cover"
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default AddImageForm;
