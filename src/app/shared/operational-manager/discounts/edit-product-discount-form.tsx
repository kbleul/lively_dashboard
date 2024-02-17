"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import CustomSelect from "@/components/ui/form/select";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import { routes } from "@/config/routes";
import cn from "@/utils/class-names";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import {
  CreateProductDiscountType,
  createProductDiscountSchema,
} from "@/validations/discount";
import moment from "moment";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";

const bannerNeedType = [
  { name: "Yes", value: true },
  { name: "No", value: false },
];

const EditProductDiscount = ({
  className,
  placeId,
  branchId,
  discountId,
}: {
  className?: string;
  placeId: string;
  branchId: string;
  discountId: string;
}) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const [searchQuery, setSearchQuery] = useState("");

  const discountData = useFetchData(
    [queryKeys.getSingleProductDiscount + discountId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/show-discount-products/${discountId}`,
    headers
  );

  const productsData = useFetchData(
    [queryKeys.getAllProducts + branchId, searchQuery],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-products/${branchId}?search=${searchQuery}`,
    headers
  );

  const pageHeader = {
    title: "Operations Manager",
    breadcrumb: [
      {
        href: routes.operationalManager.places["branch-discounts"](
          placeId,
          branchId
        ),
        name: "Product Discounts",
      },
      {
        name: "Edit",
      },
    ],
  };

  if (discountData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const discount = discountData.data.data;
  const initialValues: CreateProductDiscountType = {
    place_branch_products: discount?.products.map(
      (product: { id: string }) => product.id
    ),
    titleEnglish: discount?.title?.english,
    descriptionEnglish: discount?.description?.english,
    discount: discount?.discount,
    promo_code: discount?.promo_code,
    tickets: discount?.tickets,
    banner: discount?.need_banner,
    start_date: discount?.start_date,
    end_date: discount?.end_date,
  };

  const updateSubmitHandler = async (values: CreateProductDiscountType) => {
    const formatedStartDate = moment(values.start_date).format("YYYY-MM-DD");
    const formatedEndDate = moment(values.end_date).format("YYYY-MM-DD");

    const newValues = {
      ...values,
      start_date: formatedStartDate,
      end_date: formatedEndDate,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/update-discount-products/${discountId}`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          need_banner: values.banner,
          _method: "patch",
        },
        onSuccess: (res) => {
          toast.success("Discount Updated Successfully");
          router.push(
            routes.operationalManager.places["product-discounts"](
              placeId,
              branchId
            )
          );
        },
        onError: (err) => {
          console.log(err);
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <Formik
          initialValues={initialValues}
          validationSchema={createProductDiscountSchema}
          onSubmit={(values: CreateProductDiscountType) => {
            updateSubmitHandler(values);
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className={"[&_label.block>span]:font-medium "}>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Discount Info."
                    description="Add your discount information here"
                    className={cn(className)}
                  >
                    <FormikInput
                      name="titleEnglish"
                      label="Title"
                      placeholder="Enter Title"
                      color="primary"
                      className="col-span-2"
                    />
                    <FormikTextArea
                      name="descriptionEnglish"
                      label="Description"
                      placeholder="Write about the discount here"
                      className="col-span-2"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Discount Details"
                    description="Add the discount details here"
                  >
                    <FormikInput
                      name={`discount`}
                      label="Discount"
                      placeholder="Enter Your Discount Amount"
                      suffix="%"
                      type="number"
                      color="primary"
                    />

                    <FormikInput
                      label="Promo Code"
                      placeholder="Code"
                      color="primary"
                      name="promo_code"
                    />

                    <FormikInput
                      name="tickets"
                      label="Tickets"
                      placeholder="Enter Your Ticket Amount"
                      type="number"
                      color="primary"
                    />

                    <CustomSelect
                      name="banner"
                      label="Add banner ?"
                      options={bannerNeedType}
                      defaultValue={
                        discount?.need_banner
                          ? bannerNeedType[0]
                          : bannerNeedType[1]
                      }
                      placeholder="Do you need banner"
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      onChange={(selectedOptions: any) => {
                        setFieldValue("banner", selectedOptions.value);
                      }}
                      noOptionsMessage={() => "Loading Banner options "}
                      className="pt-2"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Select Discount Duration"
                    description="Add discount duration window"
                  >
                    <FormikInput
                      type="date"
                      name={`start_date`}
                      label="Discount Start Date"
                      color="primary"
                    />
                    <FormikInput
                      type="date"
                      name={`end_date`}
                      label="Discount End Date"
                      color="primary"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Select Products"
                    description="Add product that will have the discount"
                  >
                    <CustomSelect
                      name="place_branch_products"
                      label="Products"
                      options={productsData?.data?.data?.data}
                      defaultValue={discount?.products}
                      placeholder="Select products"
                      getOptionLabel={(option: any) =>
                        `${option?.product_variant?.product?.title?.english} ${
                          option?.product_variant?.color
                            ? option?.product_variant?.color?.name?.english
                            : ""
                        } ${
                          option?.product_variant?.size
                            ? option?.product_variant?.size?.english
                            : ""
                        } ${
                          option?.product_variant?.value
                            ? option?.product_variant?.value?.english
                            : ""
                        }`
                      }
                      getOptionValue={(option: any) => option.id}
                      onChange={(selectedOptions: any) => {
                        const selectedIds = selectedOptions.map(
                          (option: any) => option.id
                        );
                        setFieldValue("place_branch_products", selectedIds);
                      }}
                      noOptionsMessage={() => "Products options here"}
                      isMulti
                      isSearchable
                      setSearchQuery={setSearchQuery}
                      className="pt-2 col-span-2"
                    />
                    {!productsData.isLoading &&
                      productsData?.data?.data?.data.length === 0 && (
                        <p>No products found for this branch</p>
                      )}
                  </FormGroup>
                </div>
                <FormFooter
                  submitBtnText={"Save Discount"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditProductDiscount;
