"use client";

import React from "react";
import { Formik, Form } from "formik";

import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import cn from "@/utils/class-names";

import useDynamicMutation from "@/react-query/usePostData";

import FormikTextArea from "@/components/ui/form/formik-textarea";
import { branchInfoSchema, branchInfoType } from "@/validations/branches";

import AvaterPicker from "@/components/ui/form/avater-upload";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { toast } from "sonner";
import LocationForm from "./LocationForm";
import CustomSelect from "@/components/ui/form/select";
import { deliverySupportType } from "../operational-manager/branch/add-branch";

const AddBranchInfo = ({
  className,
  setFormStep,
  setBrachId,
  storeId,
}: {
  className?: string;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setBrachId: React.Dispatch<React.SetStateAction<string | null>>;
  storeId: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });

  const initialValues: branchInfoType = {
    nameEnglish: "",
    nameAmharic: "",
    descriptionEnglish: "",
    descriptionAmharic: "",
    has_delivery: 1,
    phone: "",
    telegram: "",
    facebook: "",
    whatsapp: "",
    website: "",
    instagram: "",
    latitude: "",
    longitude: "",
    branch_cover: [],
    specific_address: null,
    general_discount: 0,
  };

  const branchInfoSubmitHandler = async (values: branchInfoType) => {
    const newValues = {
      ...values,
      phone: "251".concat(values.phone),
      place_id: storeId,
      website: "https://" + values.website,
      specific_address: values.specific_address ? values.specific_address : "",
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/place-branches`,
        method: "POST",
        headers,
        body: {
          ...newValues,
        },
        onSuccess: (res) => {
          toast.success("Store Branch Information Saved Successfully");
          if (res && res.data && res.data.id) {
            setBrachId(res.data.id);
            setFormStep(2);
          }
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
        validationSchema={branchInfoSchema}
        onSubmit={(values: branchInfoType) => {
          branchInfoSubmitHandler(values);
        }}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Store Info."
                  description="Add your Store information from here"
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
                    label="ስም"
                    placeholder="ስም ኣስገባ"
                    color="primary"
                  />
                  <FormikTextArea
                    label="About Place"
                    placeholder="Write about the place"
                    color="primary"
                    name="descriptionEnglish"
                    className="col-span-2"
                  />
                  <FormikTextArea
                    label="About Place (Amharic)"
                    placeholder="Write about the place"
                    color="primary"
                    name="descriptionAmharic"
                    className="col-span-2"
                  />

                  <FormikInput
                    type="number"
                    label="Phone Number"
                    placeholder="Enter phoneNumber"
                    color="primary"
                    prefix="+251"
                    name="phone"
                    className="col-span-2"
                  />
                </FormGroup>

                <FormGroup
                  title="General Discount"
                  description="Add general discount percentage here"
                  className={cn(className)}
                >
                  <FormikInput
                    name={`general_discount`}
                    label="Discount"
                    placeholder="Enter Your Discount Amount"
                    suffix="%"
                    type="number"
                    color="primary"
                  />
                </FormGroup>

                <FormGroup
                  title="Specific Address"
                  description="Add a short detailed address"
                  className={cn(className)}
                >
                  <div className="col-span-2">
                    <FormikInput
                      name="specific_address"
                      label="Address"
                      placeholder="Eg. Bole Road next to Edna mall, Addis Ababa, Ethiopia"
                      color="primary"
                    />
                  </div>
                </FormGroup>
                <FormGroup
                  title="Branch Location"
                  description="Add branch location here"
                  className={cn(className)}
                >
                  <LocationForm />
                </FormGroup>

                <FormGroup
                  title="Upload Branch Cover"
                  description="Upload your Store logo image  here"
                  className={cn(className)}
                >
                  <AvaterPicker
                    name="branch_cover"
                    label="Branch Cover"
                    isMultiple={true}
                    className="col-span-2"
                  />
                </FormGroup>

                <FormGroup
                  title="Delivery Support"
                  description="Does this branch support delivery ?"
                  className={cn(className)}
                >
                  <CustomSelect
                    name="has_delivery"
                    label="Delivery Supported ?"
                    options={deliverySupportType}
                    defaultValue={deliverySupportType[0]}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.value}
                    onChange={(selectedOptions: any) => {
                      setFieldValue("has_delivery", selectedOptions.value);
                    }}
                    noOptionsMessage={() => "Delivery Support loading..."}
                    className="pt-2 col-span-2"
                  />
                </FormGroup>

                <FormGroup
                  title="Social Media "
                  description="You can add your social media links here."
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
                    placeholder="Enter Your whatsapp Number"
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
              </div>
              <FormFooter
                submitBtnText={"Save & Continue"}
                showSveBtn={false}
                isLoading={postMutation.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBranchInfo;
