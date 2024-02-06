"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import { FormikValues, useFormikContext } from "formik";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import CustomSelect from "@/components/ui/form/select";

const AddPlaceForm = ({ className }: { className?: string }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const headers = useGetHeaders({ type: "FormData" });
  const tagsData = useFetchData(
    [queryKeys.getAllPlaceTypes],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/place-types`,
    headers
  );
  return (
    <FormGroup
      title="Add Place Type"
      description="Choose the place type fot this product."
      className={cn(className)}
    >
      <CustomSelect
        name="place_types"
        label="place_types"
        isMulti={true}
        options={tagsData?.data?.data}
        placeholder="select place types"
        getOptionLabel={(tag: any) => tag?.name?.english}
        getOptionValue={(tag: any) => tag?.id}
        onChange={(selectedOptions: any) => {
          const selectedIds = selectedOptions.map((option: any) => option.id);
          setFieldValue("place_types", selectedIds);
        }}
        noOptionsMessage={() => "place type not found"}
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default AddPlaceForm;
