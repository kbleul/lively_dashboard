"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import { FormikValues, useFormikContext } from "formik";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import CustomSelect from "@/components/ui/form/select";

const AddTagForm = ({ className }: { className?: string }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const headers = useGetHeaders({ type: "FormData" });
  const tagsData = useFetchData(
    [queryKeys.getAllTags],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags`,
    headers
  );
  return (
    <FormGroup
      title="Add Tag"
      description="Choose the tag that this product needs to have."
      className={cn(className)}
    >
      <CustomSelect
        name="tags"
        label="tags"
        isMulti={true}
        options={tagsData?.data?.data}
        placeholder="select tags"
        getOptionLabel={(tag: any) => tag?.name?.english}
        getOptionValue={(tag: any) => tag?.id}
        onChange={(selectedOptions: any) => {
          const selectedIds = selectedOptions.map((option: any) => option.id);
          setFieldValue("tags", selectedIds);
        }}
        noOptionsMessage={() => "tags appears here"}
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default AddTagForm;
