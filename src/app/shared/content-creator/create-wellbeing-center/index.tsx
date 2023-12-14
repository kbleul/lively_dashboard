"use client";
import { Element } from "react-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import FormFooter from "@/components/form-footer";

import AddImageForm from "./add-image-form";
import AddLocationForm from "./add-location-form";
import AddOpeninHourForm from "./add-opening-hour-form";
import AddServiceForm from "./add-service-form";
import AddSocialMediaForm from "./add-social-media-form";
import CenterDetailForm from "./form-center-detail";

import FormNav, { formParts } from "./form-nav";
import {
  wellbeignSchema,
  WellBeignSchemaValues,
} from "@/utils/validations/create-wellbeing-center.schema";

const MAP_STEP_TO_COMPONENT = {
  [formParts.detail]: CenterDetailForm,
  [formParts.gallary]: AddImageForm,
  [formParts.location]: AddLocationForm,
  [formParts.openingHour]: AddOpeninHourForm,
  [formParts.service]: AddServiceForm,
  [formParts.socialMedia]: AddSocialMediaForm,
};

export default function CreateWellbeignCenterForm() {
  const methods = useForm<WellBeignSchemaValues>({
    // defaultValues: defaultValues(shipment),
    resolver: zodResolver(wellbeignSchema),
  });
  const onSubmit: SubmitHandler<WellBeignSchemaValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="[&_label.block>span]:font-medium"
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            // isLoading={isLoading}
            submitBtnText={"Create Cnter"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
