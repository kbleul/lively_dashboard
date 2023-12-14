"use client";
import FormikInput from "@/components/ui/form/input";
import { Title, Text } from "@/components/ui/text";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { wellbeignYupSchema } from "@/utils/validations/create-wellbeing-center.schema";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import FilePicker from "@/components/ui/form/dropzone";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import CustomSelect from "@/components/ui/form/select";
import AutocompleteComponent from "@/components/ui/form/Autocomplete";
import MapPickerComponent from "@/components/ui/form/MapPickerComponent";
import { toast } from "sonner";
const CreateWellbeignCenterForm = () => {
  const headers = useGetHeaders({ type: "FormData" });
  const [customDaysChecked, setCustomDaysChecked] = useState(
    Array(7).fill(false)
  );
  const workCustomDays = [
    {
      isActive: false,
      day: "Monday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Tuesday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Wednesday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Thursday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Friday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Saturday",
      from: "02:30:00",
      to: "11:30:00",
    },
    {
      isActive: false,
      day: "Sunday",
      from: "02:30:00",
      to: "11:30:00",
    },
  ];
  const initialWellbeingState = {
    nameEn: "",
    nameAm: "",
    descriptionEn: "",
    descriptionAm: "",
    phoneNumber: "",
    latitude: "",
    longitude: "",
    telegram: "",
    facebook: "",
    whatsapp: "",
    website: "",
    address: {
      city: "",
      location: "",
      loc: [],
    },
    services: [
      {
        serviceEnglish: "",
        serviceAmharic: "",
      },
    ],
    openingHours: workCustomDays,
    logo: null, // Assuming it's a file input, set to null initially
    center_cover: null, // Assuming it's a file input, set to null initially
    city_id: "",
  };
  const postMutation = useDynamicMutation();

  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `https://lively-wellbeing.unravelplc.com/api/operation-manager/cities`,
    headers
  );

  const createCenter = async (values: any) => {
    try {
      await postMutation.mutateAsync({
        url: `https://lively-wellbeing.unravelplc.com/api/operation-manager/centers`,
        method: "POST",
        headers,
        body: {
          nameAmharic: values.nameAm,
          nameEnglish: values.nameEn,
          descriptionEnglish: values.descriptionEn,
          descriptionAmharic: values.descriptionAm,
          phone: "251".concat(values.phoneNumber),
          latitude: values.address.loc[0],
          longitude: values.address.loc[1],
          telegram: values.telegram,
          facebook: values.facebook,
          whatsapp: values.whatsapp,
          website: values.website,
          instagram: values.instagram,
          services: values.services,
          opening_hours: values.openingHours.map((hours: any) => ({
            day_of_week: hours.day,
            opening_time: hours.from,
            closing_time: hours.to,
          })),
          center_logo: values.logo,
          center_cover: values.center_cover,
          city_id: values.city_id,
        },
        onSuccess: (responseData) => {
          toast.success("Login Successfull, Redirecting...");
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
    <div>
      <Title>Create Wellbeing Center</Title>
      <Formik
        initialValues={initialWellbeingState}
        validationSchema={wellbeignYupSchema}
        onSubmit={createCenter}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormikInput name="nameEn" label="English Name" />
            <FormikInput name="nameAm" label="Amharic Name" />
            <FormikInput name="descriptionEn" label="English Description" />
            <FormikInput name="descriptionAm" label="Amharic Description" />
            <FormikInput
              name="phoneNumber"
              label="Phone Number"
              prefix="+251"
              type="number"
            />
            <FormikInput name="telegram" label="telegram" />
            <FormikInput name="facebook" label="facebook" />
            <FormikInput name="whatsapp" label="whatsapp" />
            <FormikInput name="website" label="website" />
            <CustomSelect
              isSearchable
              name="city_id"
              label="Select City"
              options={cityData?.data?.data}
              onChange={(selectedOption) => {
                setFieldValue("city_id", selectedOption.id);
              }}
              placeholder="select City"
              getOptionValue={(furnished: any) => furnished?.id}
              getOptionLabel={(furnished: any) => furnished?.name?.english}
              noOptionsMessage={() => "City here"}
            />
            <FieldArray name={`services`}>
              {({ push, remove }) => (
                <div className="w-full flex flex-col items-start space-y-2 ">
                  <Text>Service</Text>
                  {values.services.map((info, i) => (
                    <div
                      key={i}
                      className=" grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                    >
                      <FormikInput
                        name={`services.${i}.serviceEnglish`}
                        label="service English"
                      />

                      <div className="flex flex-col items-end justify-end ">
                        <FormikInput
                          name={`services.${i}.serviceAmharic`}
                          label="serviceAmharic"
                        />
                        <Button variant="outline" onClick={() => remove(i)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      push({ serviceEnglish: "", serviceAmharic: "" })
                    }
                  >
                    Add Service
                  </Button>
                </div>
              )}
            </FieldArray>
            <FilePicker name="logo" label="logo" />
            <FilePicker name="center_cover" label="center cover" />
            <AutocompleteComponent
              name={["address.location", "address.loc", "address.city"]}
              label="select city"
            />
            <MapPickerComponent name="address.loc" label="address" />
            {/* opening hours */}
            {values.openingHours.map((_: any, index: number) => (
              <div className="flex items-center gap-2 w-full " key={index}>
                <input
                  type="checkbox"
                  checked={customDaysChecked[index]}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCustomDaysChecked((prevChecked) => {
                      const newChecked = [...prevChecked];
                      newChecked[index] = isChecked;
                      return newChecked;
                    });
                  }}
                />

                <FormikInput
                  name={`openingHours[${index}].day`}
                  label="Day"
                  disabled
                />
                <FormikInput
                  name={`openingHours[${index}].from`}
                  label="Opening Time"
                  disabled={!customDaysChecked[index]}
                  type="time"
                />
                <FormikInput
                  name={`openingHours[${index}].to`}
                  label="Closing Time"
                  type="time"
                  disabled={!customDaysChecked[index]}
                />
              </div>
            ))}

            <Button
              isLoading={postMutation.isPending}
              type="submit"
              color="primary"
            >
              Create Center
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateWellbeignCenterForm;
