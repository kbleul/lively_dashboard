"use client";
import React from "react";
import { CreatePackageType, createPackageSchema } from "@/validations/package";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/query-keys";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FieldArray, Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { useFetchData } from "@/react-query/useFetchData";
import CustomSelect from "@/components/ui/form/select";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import CreatableCustomSelect from "@/components/ui/form/creatable-select";

interface Service {
  id: string;
  name: {
    english: string;
    // Add other language properties if needed
  };
  // Add other properties as needed
}
const CreatePackageForm = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const router = useRouter();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();
  const initialValues: CreatePackageType = {
    service_id: {
      name: {
        english: "",
      },
    },
    package_category: "",
    packages: [],
  };

  const packageTypes = useFetchData(
    [queryKeys.getPackageTypes + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/package-types`,
    headers
  );
  const serviceData = useFetchData(
    [queryKeys.getAllServices + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/place-services/${branchId}`,
    headers
  );
  const categoryData = useFetchData(
    [queryKeys.getBranchPackageType + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/package-categories/${branchId}`,
    headers
  );

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

  const createPackage = async (values: CreatePackageType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-packages/${branchId}`,
        method: "POST",
        headers,
        body: {
          service_id: (values.service_id as Service).id,
          package_category: values.package_category,
          packages: values.packages?.map((item) => ({
            ...item,
            duration:
              item.startTime && item.endTime
                ? item.startTime + "-" + item.endTime
                : "",
          })),
        },
        onSuccess: (res: any) => {
          router.push(
            routes.operationalManager.places["list-packages"](placeId, branchId)
          );
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackages + branchId],
          });
          toast.success("Package Created Successfully");
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createPackageSchema}
        onSubmit={createPackage}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-start">
                <CustomSelect
                  name="service_id"
                  label="Service Type"
                  options={serviceData?.data?.data}
                  defaultValue={
                    (values.service_id as Service).name.english &&
                    values.service_id
                  }
                  placeholder="select Service Type"
                  getOptionLabel={(tag: any) => tag?.name?.english}
                  getOptionValue={(tag: any) => tag?.id}
                  onChange={(selectedOptions: any) => {
                    setFieldValue("service_id", selectedOptions);
                  }}
                  noOptionsMessage={() => "service type appears here"}
                  className="pt-2"
                />

                <CreatableCustomSelect
                  isSearchable
                  name={`package_category`}
                  label="Package Category"
                  options={categoryData?.data?.data?.map((item: any) => ({
                    label: item?.name,
                    value: item?.name,
                  }))}
                  placeholder="select Package Category"
                  getOptionLabel={(tag: any) => tag?.label}
                  getOptionValue={(tag: any) => tag?.value}
                  onChange={(selectedOptions: any) => {
                    setFieldValue(`package_category`, selectedOptions?.value);
                  }}
                  noOptionsMessage={() => "Package type appears here"}
                />
              </div>

              {/* add package */}
              <FieldArray name="packages">
                {(data: any) => (
                  <div className="w-full flex flex-col items-start space-y-5 col-span-2">
                    {values.packages?.map((_: any, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-start bg-white dark:bg-black rounded-md p-3 shadow-lg"
                      >
                        <div className="w-full flex flex-col items-start gap-3">
                          <FormikInput
                            name={`packages.${index}.title`}
                            label="Package Title"
                            placeholder="Enter Package Title"
                            color="primary"
                          />
                          <FormikTextArea
                            name={`packages.${index}.description`}
                            label="Package Description"
                            placeholder="Enter Package Description"
                            color="primary"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                            <FormikInput
                              type="time"
                              name={`packages.${index}.startTime`}
                              label="Package Start Dration"
                              color="primary"
                            />
                            <FormikInput
                              type="time"
                              name={`packages.${index}.endTime`}
                              label="Package End Dration"
                              color="primary"
                            />
                          </div>
                          <p>* Leave empty for any time</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                          <CustomSelect
                            name={`packages.${index}.enrollment_type`}
                            label="Enrollment Type"
                            options={enrollmentType}
                            placeholder="select Package Enrolment Type"
                            getOptionLabel={(tag: any) => tag?.name}
                            getOptionValue={(tag: any) => tag?.name}
                            onChange={(selectedOptions: any) => {
                              setFieldValue(
                                `packages.${index}.enrollment_type`,
                                selectedOptions?.name
                              );
                            }}
                            noOptionsMessage={() => "Package type appears here"}
                          />

                          <CustomSelect
                            name={`packages.${index}.package_type_id`}
                            label="Package Type"
                            options={packageTypes?.data?.data}
                            placeholder="select Package Type"
                            getOptionLabel={(tag: any) => tag?.name?.english}
                            getOptionValue={(tag: any) => tag?.id}
                            onChange={(selectedOptions: any) => {
                              setFieldValue(
                                `packages.${index}.package_type_id`,
                                selectedOptions?.id
                              );
                            }}
                            noOptionsMessage={() => "Package type appears here"}
                            className="pt-4"
                          />

                          <FormikInput
                            name={`packages.${index}.frequency`}
                            label="Add Package Frequency"
                            placeholder="Enter Package Frequency"
                            color="primary"
                            type="number"
                          />

                          <CustomSelect
                            name={`packages.${index}.frequency_type`}
                            label="Frequency Type"
                            options={frequencyType}
                            placeholder="Frequency Type"
                            getOptionLabel={(tag: any) => tag?.name}
                            getOptionValue={(tag: any) => tag?.name}
                            onChange={(selectedOptions: any) => {
                              setFieldValue(
                                `packages.${index}.frequency_type`,
                                selectedOptions?.name
                              );
                            }}
                            noOptionsMessage={() =>
                              "Frequency type appears here"
                            }
                          />
                          <FormikInput
                            type="number"
                            name={`packages.${index}.price`}
                            label="Package Price"
                            placeholder="Enter Package Price"
                            color="primary"
                          />
                        </div>
                        <div>
                          {values?.packages &&
                            values?.packages?.length > 1 &&
                            index > 0 && (
                              <Button
                                type="button"
                                onClick={() => data.remove(index)}
                                variant="outline"
                                color="danger"
                              >
                                Remove Package
                              </Button>
                            )}
                        </div>
                      </div>
                    ))}

                    <div className="mt-4">
                      <Button
                        onClick={() =>
                          data.push({
                            title: "",
                            description: "",
                            package_type_id: "",
                            enrollment_type: "",
                            startTime: "",
                            endTime: "",
                            price: "",
                            frequency: "",
                            frequency_type: "",
                          })
                        }
                        color="primary"
                        variant="flat"
                      >
                        Add Package
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="flex items-end justify-end w-full">
                <Button
                  isLoading={postMutation.isPending}
                  color="primary"
                  size="lg"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreatePackageForm;
