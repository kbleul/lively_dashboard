import FormFooter from "@/components/form-footer";
import FormikTextEditor from "@/components/ui/form/formik-text-editor";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import useDynamicMutation from "@/react-query/usePostData";
import {
  EditProductType,
  editProductValidationSchema,
} from "@/validations/product";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";

interface Product {
  title: {
    english: string;
    amharic: string;
  };
  description: {
    english: string;
    amharic: string;
  };
  brand_id: string;
  unit_id: string;
  brand: any;
  unit: any;
  tags: any[];
}
const ProductDetailEdit = ({ id, data }: { id: string; data: Product }) => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClicnt = useQueryClient();
  const initalValues: EditProductType = {
    title: data?.title?.amharic,
    titleAm: data?.title?.english,
    description: data?.description?.amharic,
    descriptionAm: data?.description?.english,
    unit: data?.unit_id,
    brand: data?.brand_id,
    tags: data?.tags?.map((tag) => tag.id),
  };
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
  const tagsData = useFetchData(
    [queryKeys.getAllTags],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags`,
    headers
  );
  const postMutation = useDynamicMutation();

  const editProductHandeler = async (values: EditProductType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/products/${id}`,
        method: "POST",
        headers,
        body: {
          titleAmharic: values.titleAm,
          titleEnglish: values.title,
          descriptionAmharic: values.descriptionAm,
          descriptionEnglish: values.description,
          unit_id: values.unit,
          brand_id: values.brand,
          tags: values.tags,
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Product Edited Successfully");
          queryClicnt.invalidateQueries({
            queryKey: [queryKeys.getSingleProduct],
          });
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
    <Formik
      initialValues={initalValues}
      validationSchema={editProductValidationSchema}
      onSubmit={editProductHandeler}
    >
      {({ handleChange, setFieldValue }) => (
        <Form className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 w-full gap-5">
          <FormikInput
            name="title"
            label="Product Title English"
            placeholder="Enter Product Title English"
            color="primary"
          />
          <FormikInput
            name="titleAm"
            label="የእቃ ስም"
            placeholder="Enter Product Title Amharic"
            color="primary"
          />
          <FormikTextEditor
            name="description"
            label="Product Description English"
          />
          <FormikTextEditor
            name="descriptionAm"
            label="Product Description Amharic"
          />
          <CustomSelect
            name="unit"
            label="product unit"
            options={unitData?.data?.data}
            defaultValue={data.unit}
            getOptionLabel={(category: any) => category?.name?.english}
            getOptionValue={(category: any) => category?.id}
            onChange={(selectedOption: any) => {
              handleChange("unit")(selectedOption.id);
            }}
            placeholder="select product unit"
            noOptionsMessage={() => "unit appears here"}
          />
          <CustomSelect
            isSearchable={true}
            name="brand"
            defaultValue={data.brand}
            label="product brand"
            options={brandsData?.data?.data}
            getOptionLabel={(brand: any) => brand?.name?.english}
            getOptionValue={(brand: any) => brand?.id}
            onChange={(selectedOption: any) => {
              handleChange("brand")(selectedOption.id);
            }}
            placeholder="select product brand"
            noOptionsMessage={() => "brand appears here"}
          />
          <CustomSelect
            name="tags"
            label="tags"
            isMulti={true}
            defaultValue={data.tags}
            options={tagsData?.data?.data}
            placeholder="select tags"
            getOptionLabel={(tag: any) => tag?.name?.english}
            getOptionValue={(tag: any) => tag?.id}
            onChange={(selectedOptions: any) => {
              const selectedIds = selectedOptions.map(
                (option: any) => option.id
              );
              setFieldValue("tags", selectedIds);
            }}
            noOptionsMessage={() => "tags appears here"}
            className="col-span-2"
          />
          <FormFooter
            submitBtnText={"Edit Product"}
            showSveBtn={false}
            isLoading={postMutation.isPending}
            className="col-span-2"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProductDetailEdit;
