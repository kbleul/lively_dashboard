"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { Element } from "react-scroll";
import {
  CreateWellbeingType,
  wellbeignYupSchema,
} from "@/validations/create-wellbeing-center.schema";
import { Formik, Form } from "formik";
import FormNav, { formParts } from "./form-nav";
import FormFooter from "@/components/form-footer";
import React from "react";
import { toast } from "sonner";
import CenterDetailForm from "./form-center-detail";
import AddServiceForm from "./add-service-form";
import AddImageForm from "./add-image-form";
import AddLocationForm from "./add-location-form";
import AddSocialMediaForm from "./add-social-media-form";
import AddOpeninHourForm from "./add-opening-hour-form";
import { workCustomDays } from "@/constants/form-constants";
import { appendDefaultSecond } from "@/utils/append-second";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
const CreateWellbeignCenterForm = () => {
  const MAP_STEP_TO_COMPONENT = {
    [formParts.detail]: CenterDetailForm,
    [formParts.service]: AddServiceForm,
    [formParts.gallary]: AddImageForm,
    [formParts.location]: AddLocationForm,
    [formParts.socialMedia]: AddSocialMediaForm,
    [formParts.openingHour]: AddOpeninHourForm,
  };

  const headers = useGetHeaders({ type: "FormData" });
  const router = useRouter();
  const initialWellbeingState: CreateWellbeingType = {
    nameEn: "",
    nameAm: "",
    descriptionEn: "",
    descriptionAm: "",
    phoneNumber: "",
    instagram: "",
    telegram: "",
    facebook: "",
    whatsapp: "",
    website: "",
    lat: "",
    lng: "",
    services: [
      {
        serviceEnglish: "",
        serviceAmharic: "",
      },
    ],
    openingHours: workCustomDays,
    logo: undefined, // Assuming it's a file input, set to undefined initially
    center_cover: undefined, // Assuming it's a file input, set to null initially
    city_id: "",
  };
  const postMutation = useDynamicMutation();

  const createCenter = async (values: CreateWellbeingType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/centers`,
        method: "POST",
        headers,
        body: {
          nameAmharic: values.nameAm,
          nameEnglish: values.nameEn,
          descriptionEnglish: values.descriptionEn,
          descriptionAmharic: values.descriptionAm,
          phone: "251".concat(values.phoneNumber),
          latitude: values.lat,
          longitude: values.lng,
          telegram: values.telegram,
          facebook: values.facebook,
          whatsapp: values.whatsapp,
          website: values.website,
          instagram: values.instagram,
          services: values.services,
          opening_hours: values.openingHours.map((hours: any) => ({
            day_of_week: hours.day,
            opening_time: appendDefaultSecond(hours.from),
            closing_time: appendDefaultSecond(hours.to),
          })),
          center_logo: values.logo,
          center_cover: values.center_cover,
          city_id: values.city_id,
        },
        onSuccess: () => {
          router.push(routes.operationalManager.centers.list);
          toast.success("Center Create Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="@container">
      <Formik
        initialValues={initialWellbeingState}
        validationSchema={wellbeignYupSchema}
        onSubmit={createCenter}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <FormNav />
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                {Object.entries(MAP_STEP_TO_COMPONENT).map(
                  ([key, Component]) => (
                    <Element
                      key={key}
                      name={formParts[key as keyof typeof formParts]}
                    >
                      {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
                    </Element>
                  )
                )}
              </div>
              <FormFooter
                submitBtnText={"Create Cnter"}
                isLoading={postMutation.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateWellbeignCenterForm;
