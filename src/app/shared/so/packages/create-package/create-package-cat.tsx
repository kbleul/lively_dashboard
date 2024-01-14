"use client";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { FormikValues, useFormikContext } from "formik";
import { ActionIcon } from "@/components/ui/action-icon";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Service } from "@/types/packages";
interface Props {
  setIsCatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePackageCat = ({ setIsCatModalOpen }: Props) => {

  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const headers = useGetHeaders({ type: "FormData" });
  const serviceData = useFetchData(
    [queryKeys.getAllServices],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/place-services`,
    headers
  );
  console.log({ values });
  return (
    <div className="m-auto px-7 pt-6 pb-8">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h3">Add Package</Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => setIsCatModalOpen(false)}
        >
          <FaTimes className="h-4 w-4" />
        </ActionIcon>
      </div>
      <div className="w-full flex flex-col items-start space-y-3">
        <CustomSelect
          name="service_id"
          label="Service Type"
          options={serviceData?.data?.data}
          defaultValue={
            (values.service_id as Service).name.english && values.service_id
          }
          placeholder="select Service Type"
          getOptionLabel={(tag: any) => tag?.name?.english}
          getOptionValue={(tag: any) => tag?.id}
          onChange={(selectedOptions: any) => {
            setFieldValue("service_id", selectedOptions);
          }}
          noOptionsMessage={() => "service type appears here"}
        />
        <FormikInput
          name="package_category"
          label="Package Category"
          placeholder="Enter Package Category"
          color="primary"
        />
        <div className="w-full flex items-center gap-3 justify-end">
          <Button
            onClick={() => setIsCatModalOpen(false)}
            color="primary"
            variant="outline"
            className="w-fit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (values.service_id && values.package_category) {
                setIsCatModalOpen(false);
              }
            }}
            type="submit"
            color="primary"
            disabled={!(values.service_id && values.package_category)}
            className="w-fit"
          >
            Create Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePackageCat;
