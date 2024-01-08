"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";

const ProductDetailForm = ({ className }: { className?: string }) => {
  return (
    <FormGroup
      title="Product Detail"
      description="Edit your Product detail from here"
      className={cn(className)}
    >
      <FormikInput
        name="title"
        label="Product Title English"
        placeholder="Enter Product Title English"
        color="primary"
      />
      <FormikInput
        name="titleAm"
        label="የእቃ ስም"
        placeholder="Enter Product Title Amharic"
        color="primary"
      />
      <FormikTextArea
        name="description"
        label="Product Description"
        placeholder="Enter Product Description English"
        color="primary"
        className="col-span-2"
      />
      <FormikTextArea
        name="descriptionAm"
        label="Product Amharic Description"
        placeholder="Enter Product Description Amharic"
        color="primary"
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default ProductDetailForm;
