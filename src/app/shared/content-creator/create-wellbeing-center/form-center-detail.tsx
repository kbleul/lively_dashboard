import FormGroup from "@/components/form-group";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import cn from "@/utils/class-names";
import { Textarea } from "@/components/ui/textarea";

const CenterDetailForm = ({ className }: { className?: string }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="Center detail"
      description="Edit your Center detail Here"
      className={cn(className)}
    >
      <Input
        label="Center Name"
        placeholder="Enter Center Name"
        {...register("nameEn")}
        error={errors.nameEn?.message as string}
      />
      <Input
        label="የቤቱ ስም"
        placeholder="የቤቱ ስም"
        {...register("nameAm")}
        error={errors.nameAm?.message as string}
      />
      <Input
        label="Phone Number"
        placeholder="Enter Phone Number"
        prefix="+251"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message as string}
        className="col-span-2"
      />
      <Input
        label="Email"
        placeholder="Enter Email"
        {...register("email")}
        error={errors.email?.message as string}
        className="col-span-2"
      />
      <Textarea
        label="About Place"
        placeholder="Write about the place"
        {...register("descriptionEn")}
        error={errors.descriptionEn?.message as string}
        className="col-span-2"
      />
      <Textarea
        label="About Place (Amharic)"
        placeholder="Write about the place"
        {...register("descriptionAm")}
        error={errors.descriptionAm?.message as string}
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default CenterDetailForm;


