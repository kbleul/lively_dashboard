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
import PageHeader from "../../page-header";
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

const bannerNeedType = [
  { name: "Yes", value: true },
  { name: "No", value: false },
];

const EditProductDiscount = ({
  className,
  placeId,
  branchId,
}: {
  className?: string;
  placeId: string;
  branchId: string;
}) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const productsDiscount = useFetchData(
    [queryKeys.getAllProducts + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-products/${branchId}`,
    headers
  );

  const productsData = useFetchData(
    [queryKeys.getAllProducts + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-products/${branchId}`,
    headers
  );

  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.branch["product-discounts"](placeId, branchId),
        name: "Product Discounts",
      },
      {
        name: "Edit",
      },
    ],
  };

  const initialValues: CreateProductDiscountType = {
    place_branch_products: [],
    titleEnglish: "",
    descriptionEnglish: "",
    discount: 0,
    promo_code: "",
    tickets: 1,
    banner: false,
    start_date: undefined,
    end_date: undefined,
  };

  const createOwnerSubmitHandler = async (
    values: CreateProductDiscountType
  ) => {
    const formatedStartDate = moment(values.start_date).format("YYYY-MM-DD");
    const formatedEndDate = moment(values.end_date).format("YYYY-MM-DD");

    const newValues = {
      ...values,
      start_date: formatedStartDate,
      end_date: formatedEndDate,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/discount-products`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          need_banner: values.banner,
        },
        onSuccess: (res) => {
          toast.success("Discount Saved Successfully");
          router.push(
            routes.storeOwner.branch["product-discounts"](placeId, branchId)
          );
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <Formik
          initialValues={initialValues}
          validationSchema={createProductDiscountSchema}
          onSubmit={(values: CreateProductDiscountType) => {
            createOwnerSubmitHandler(values);
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
                      defaultValue={bannerNeedType[0].value}
                      placeholder="Do you need banner"
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      onChange={(selectedOptions: any) => {
                        setFieldValue("banner", selectedOptions.value);
                      }}
                      noOptionsMessage={() => "Banner options here"}
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
                      noOptionsMessage={() => "Banner options here"}
                      isMulti
                      isSearchable
                      className="pt-2 col-span-2"
                    />
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
