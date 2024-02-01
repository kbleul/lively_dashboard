"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import FormikTextEditor from "@/components/ui/form/formik-text-editor";

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
      <FormikTextEditor
        name="description"
        label="Product Description English"
        className="col-span-2"
      />
      <FormikTextEditor
        name="descriptionAm"
        label="Product Description Amharic"
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default ProductDetailForm;
