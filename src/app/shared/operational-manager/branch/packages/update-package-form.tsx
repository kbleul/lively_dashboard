"use client";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { UpdatePackageType, updatePackageSchema } from "@/validations/package";
import { queryKeys } from "@/react-query/query-keys";
import { toast } from "sonner";
import CustomSelect from "@/components/ui/form/select";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
type PackageData = {
  title: string;
  description: string;
  package_type_id: string;
  enrollment_type: string;
  startTime: string;
  endTime: string;
  price: string;
  frequency: string;
  frequency_type: string;
};
interface Props {
  id: string;
  item: PackageData;
}
const UpdatePackageForm = ({ id, item }: Props) => {
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();
  const enrollmentType = [
    { name: "Appointment", value: "Appointment" },
    { name: "Membership", value: "Membership" },
  ];
  const frequencyType = [
    { name: "Hour", value: "Hour" },
    { name: "Day", value: "Day" },
    { name: "Week", value: "Week" },
    { name: "Month", value: "Month" },
    { name: "Year", value: "Year" },
  ];
  const packageTypes = useFetchData(
    [queryKeys.getPackageTypes],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/package-types`,
    headers
  );
  const initialVlues = {
    title: item.title ?? "",
    description: item.description ?? "",
    package_type_id: item.package_type_id ?? "",
    enrollment_type: item.enrollment_type ?? "",
    startTime: item.startTime ?? "",
    endTime: item.endTime ?? "",
    price: item.price ?? "",
    frequency: item.frequency ?? "",
    frequency_type: item.frequency_type ?? "",
  };

  //update package
  const createPackage = async (values: UpdatePackageType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/update-branch-packages/${id}`,
        method: "POST",
        headers,
        body: {
          title: values.title,
          description: values.description,
          enrollment_type: values.enrollment_type,
          price: values.price,
          duration:
            values.startTime &&
            values.startTime !== "" &&
            values.endTime &&
            values.endTime !== ""
              ? values.startTime + "-" + values.endTime
              : "",
          frequency: values.frequency,
          frequency_type: values.frequency_type,
          _method: "PATCH",
        },
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackages],
          });
          toast.success("Package Updated Successfully");
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
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Edit Package
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialVlues}
        validationSchema={updatePackageSchema}
        onSubmit={createPackage}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-start">
                <FormikInput
                  name={`title`}
                  label="Package Title"
                  placeholder="Enter Package Title"
                  color="primary"
                />
                <FormikTextArea
                  name={`description`}
                  label="Package Description"
                  placeholder="Enter Package Description"
                  color="primary"
                />
                <FormikInput
                  type="time"
                  name={`startTime`}
                  label="Package Start Dration"
                  color="primary"
                />
                <FormikInput
                  type="time"
                  name={`endTime`}
                  label="Package End Dration"
                  color="primary"
                />
                <CustomSelect
                  name={`enrollment_type`}
                  label="Enrollment Type"
                  options={enrollmentType}
                  defaultValue={enrollmentType.find(
                    (en) => en.value === item.enrollment_type
                  )}
                  placeholder="select Package Enrolment Type"
                  getOptionLabel={(tag: any) => tag?.name}
                  getOptionValue={(tag: any) => tag?.name}
                  onChange={(selectedOptions: any) => {
                    setFieldValue(`enrollment_type`, selectedOptions?.name);
                  }}
                  noOptionsMessage={() => "Package type appears here"}
                />

                <CustomSelect
                  name={`package_type_id`}
                  label="Package Type"
                  options={packageTypes?.data?.data}
                  defaultValue={packageTypes?.data?.data?.find(
                    (en: { id: string }) => en.id === item.package_type_id
                  )}
                  placeholder="select Package Type"
                  getOptionLabel={(tag: any) => tag?.name?.english}
                  getOptionValue={(tag: any) => tag?.id}
                  onChange={(selectedOptions: any) => {
                    setFieldValue(`package_type_id`, selectedOptions?.id);
                  }}
                  noOptionsMessage={() => "Package type appears here"}
                />

                <FormikInput
                  type="number"
                  name={`price`}
                  label="Package Price"
                  placeholder="Enter Package Price"
                  color="primary"
                />
                <FormikInput
                  name={`frequency`}
                  label="Add Package Frequency"
                  placeholder="Enter Package Frequency"
                  color="primary"
                  type="number"
                />

                <CustomSelect
                  name={`frequency_type`}
                  label="Frequency Type"
                  options={frequencyType}
                  defaultValue={frequencyType.find(
                    (en) => en.value === item.frequency_type
                  )}
                  placeholder="Frequency Type"
                  getOptionLabel={(tag: any) => tag?.name}
                  getOptionValue={(tag: any) => tag?.name}
                  onChange={(selectedOptions: any) => {
                    setFieldValue(`frequency_type`, selectedOptions?.name);
                  }}
                  noOptionsMessage={() => "Frequency type appears here"}
                />
              </div>

              <div className="flex items-end justify-end w-full">
                <Button
                  isLoading={postMutation.isPending}
                  color="primary"
                  size="lg"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdatePackageForm;
