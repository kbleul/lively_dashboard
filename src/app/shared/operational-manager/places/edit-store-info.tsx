"use client";

import { StoreType, storeSchema } from "@/validations/places";
import React from "react";
import FormFooter, { negMargin } from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import cn from "@/utils/class-names";
import { Formik, Form, useFormikContext, FormikValues } from "formik";

import { useGetHeaders } from "@/hooks/use-get-headers";

import FormikTextArea from "@/components/ui/form/formik-textarea";
import CustomSelect from "@/components/ui/form/select";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";

import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

const EditStoreInfo = ({
  className,
  storeData,
}: {
  className?: string;
  storeData: any;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });

  const router = useRouter();

  const initialValues: StoreType = {
    place_type_id: storeData.place_type.id,
    nameEnglish: storeData.name.english,
    nameAmharic: storeData.name.amharic,
    descriptionEnglish: storeData.name.english,
    descriptionAmharic: storeData.name.amharic,
    website: storeData.website ? storeData.website.slice(8) : "",
    phone: storeData.phone.slice(3),
    place_logo:
      storeData.place_logo && storeData.place_logo.url
        ? storeData.place_logo.url
        : "",
  };

  const storeInfoSubmitHandler = async (values: StoreType) => {
    const newValues = {
      ...values,
      phone: "251".concat(values.phone),
      owner_id: storeData.owner_id,
    };

    if (values.website !== "") {
      newValues.website = "https://" + values.website;
    }

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/places/${storeData.id}`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Store Information Updated Successfully");
          router.push(routes.operationalManager.places.view(storeData.id));
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="@container">
      <Formik
        initialValues={initialValues}
        validationSchema={storeSchema}
        onSubmit={(values: StoreType) => storeInfoSubmitHandler(values)}
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Store Info."
                  description="Edit your Store information from here"
                  className={cn(className)}
                >
                  <FormikInput
                    name="nameEnglish"
                    label="Place Name"
                    placeholder="Enter Place Name"
                    color="primary"
                  />
                  <FormikInput
                    name="nameAmharic"
                    label="የቤቱ ስም"
                    placeholder="ስም ኣስገባ"
                    color="primary"
                  />

                  <BusinessTypeSelect placeId={storeData.place_type.id} />

                  <FormikInput
                    type="number"
                    label="Phone Number"
                    placeholder="Enter phoneNumber"
                    color="primary"
                    prefix="+251"
                    name="phone"
                    className="col-span-2"
                  />

                  <FormikTextArea
                    name="descriptionEnglish"
                    label="About Place"
                    placeholder="Write about the place"
                    color="primary"
                    className="col-span-2"
                  />
                  <FormikTextArea
                    name="descriptionAmharic"
                    label="About Place (Amharic)"
                    placeholder="Write about the place"
                    color="primary"
                    className="col-span-2"
                  />
                </FormGroup>

                <FormGroup
                  title="Website"
                  description="Add your website link here if you have one."
                  className={cn(className)}
                >
                  <div className="col-span-2">
                    <FormikInput
                      name={`website`}
                      label="Website"
                      placeholder="lively-et.com"
                      prefix="https://"
                      type="text"
                      color="primary"
                    />
                  </div>
                </FormGroup>

                <FormFooter
                  submitBtnText={"Save Edit"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const BusinessTypeSelect = ({ placeId }: { placeId: string }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();

  const headers = useGetHeaders({ type: "FormData" });

  const unitData = useFetchData(
    [queryKeys.getAllPlaceTypes],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/place-types`,
    headers
  );

  return (
    <CustomSelect
      name="place_type_id"
      label="Business Type"
      options={unitData?.data?.data}
      defaultValue={placeId}
      getOptionLabel={(category: any) => category?.name?.english}
      getOptionValue={(category: any) => category?.id}
      onChange={(selectedOptions: any) => {
        setFieldValue("place_type_id", selectedOptions.id);
      }}
      placeholder="Select Business type"
      noOptionsMessage={() => "Business types appears here"}
      className="col-span-2"
    />
  );
};

export default EditStoreInfo;
