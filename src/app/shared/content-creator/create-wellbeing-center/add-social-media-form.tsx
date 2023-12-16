"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";

const AddSocialMediaForm = ({ className }: { className?: string }) => {
  return (
    <FormGroup
      title="Social Media "
      description="Edit your working days & hours from here"
      className={cn(className)}
    >
      <FormikInput
        name={`telegram`}
        label="Telegram"
        placeholder="Enter Your Telegram Username"
        prefix="t.me//"
        type="text"
        color="primary"
      />
      <FormikInput
        name={`facebook`}
        label="Facebook"
        placeholder="Enter Your Facebook Username"
        type="text"
        color="primary"
      />
      <FormikInput
        name={`whatsapp`}
        label="Watsapp"
        placeholder="Enter Your Watsapp Number"
        prefix="+251"
        type="number"
        color="primary"
      />
      <FormikInput
        name={`website`}
        label="Website"
        placeholder="lively-et.com"
        prefix="https://"
        type="text"
        color="primary"
      />
      <FormikInput
        name={`instagram`}
        label="Instagram"
        placeholder="Enter Your Instagram Username"
        type="text"
        color="primary"
      />
    </FormGroup>
  );
};

export default AddSocialMediaForm;
