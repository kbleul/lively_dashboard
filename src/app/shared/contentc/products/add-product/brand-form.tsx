"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { FormikValues, useFormikContext } from "formik";

const BrandForm = ({ className }: { className?: string }) => {
  const { handleChange } = useFormikContext<FormikValues>();
  const headers = useGetHeaders({ type: "FormData" });
  const unitData = useFetchData(
    [queryKeys.getAllUnits],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units`,
    headers
  );
  const brandsData = useFetchData(
    [queryKeys.getAllBrands],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/brands`,
    headers
  );
  return (
    <FormGroup
      title="Brand & Unit Info."
      description="Edit the brand and Unit information from here"
      className={cn(className)}
    >
      <CustomSelect
        name="unit"
        label="product unit"
        options={unitData?.data?.data}
        getOptionLabel={(category: any) => category?.name?.english}
        getOptionValue={(category: any) => category?.id}
        onChange={(selectedOption: any) => {
          handleChange("unit")(selectedOption.id);
        }}
        placeholder="select product unit"
        noOptionsMessage={() => "unit appears here"}
        className="col-span-2"
      />
      <CustomSelect
        isSearchable={true}
        name="brand"
        label="product brand"
        options={brandsData?.data?.data}
        getOptionLabel={(brand: any) => brand?.name?.english}
        getOptionValue={(brand: any) => brand?.id}
        onChange={(selectedOption: any) => {
          handleChange("brand")(selectedOption.id);
        }}
        placeholder="select product brand"
        noOptionsMessage={() => "brand appears here"}
        className="col-span-2"
      />
    </FormGroup>
  );
};

export default BrandForm;
