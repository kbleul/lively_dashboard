"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { Element } from "react-scroll";

import { Formik, Form } from "formik";
import FormNav, { formParts } from "./form-nav";
import FormFooter from "@/components/form-footer";
import React from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import ProductDetailForm from "./product-detail-form";
import BrandForm from "./brand-form";
import AddTagForm from "./add-tag-form";
import AddVariantForm from "./add-variant-form";
import { ProductType, productValidationSchema } from "@/validations/product";
import { clean } from "@/utils/clean-object";
const CreateProductForm = () => {
  const MAP_STEP_TO_COMPONENT = {
    [formParts.detail]: ProductDetailForm,
    [formParts.brand]: BrandForm,
    [formParts.tag]: AddTagForm,
    [formParts.variant]: AddVariantForm,
  };

  const headers = useGetHeaders({ type: "FormData" });
  const router = useRouter();
  const initialValues: ProductType = {
    title: "",
    titleAm: "",
    description: "",
    descriptionAm: "",
    unit: "",
    brand: "",
    tags: [],
    variant_type: "",
    product_variants: [
      {
        valueEnglish: "",
        valueAmharic: "",
        colorNameEnglish: "",
        colorNameAmharic: "",
        colorHash: "",
        product_image: "",
        additionalInfo: [],
      },
    ],
  };
  const postMutation = useDynamicMutation();

  const createProductHandeler = async (values: ProductType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/products`,
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
          thumbnail: values.product_variants[0].product_image,
          variant_type: values.variant_type,
          product_variants: values.product_variants?.map((variant) =>
            clean(variant)
          ),
        },
        onSuccess: (res) => {
          router.push(routes.contentCreator.product);
          toast.success("Product Created Successfully");
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
        validationSchema={productValidationSchema}
        onSubmit={createProductHandeler}
      >
        {({ handleSubmit, errors, values }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <FormNav />
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                {Object.entries(MAP_STEP_TO_COMPONENT).map(
                  ([key, Component]) => (
                    <Element
                      key={key}
                      name={formParts[key as keyof typeof formParts]}
                    >
                      {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
                    </Element>
                  )
                )}
              </div>
              <FormFooter
                submitBtnText={"Create Product"}
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

export default CreateProductForm;
