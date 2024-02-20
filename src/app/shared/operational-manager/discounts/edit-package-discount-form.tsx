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

import moment from "moment";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import {
  CreatePackagetDiscountType,
  createPackageDiscountSchema,
} from "@/validations/discount";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";

const EditPackageDiscount = ({
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

  const discountData = useFetchData(
    [queryKeys.getSingleProductDiscount + discountId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/show-discount-packages/${discountId}`,
    headers
  );

  const packagesDate = useFetchData(
    [queryKeys.getAllPackages + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-packages/${branchId}`,
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
        name: "Package Discounts",
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

  const discount = discountData?.data?.data;

  const initialValues: CreatePackagetDiscountType = {
    place_branch_packages: discount?.packages.map(
      (packageItem: { id: string }) => packageItem.id
    ),
    titleEnglish: discount?.title?.english,
    descriptionEnglish: discount?.description?.english,
    discount: discount?.discount,
    promo_code: discount?.promo_code,
    tickets: discount?.tickets,
    start_date: discount?.start_date,
    end_date: discount?.end_date,
  };

  console.log("woooooooooooooooo", discount?.title?.english);

  const updateDiscountSubmitHandler = async (
    values: CreatePackagetDiscountType
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
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/update-discount-packages/${discountId}`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          _method: "patch",
        },
        onSuccess: (res) => {
          toast.success("Discount updated Successfully");
          router.push(
            routes.operationalManager.places["package-discounts"](
              placeId,
              branchId
            )
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

  if (packagesDate.isFetching || packagesDate.isLoading) return;

  const packageOptions: any[] = [];

  packagesDate.data.data.forEach((item: any) => {
    item?.packages?.forEach((packageItem: any) => {
      packageOptions.push(packageItem);
    });
  });

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <Formik
          initialValues={initialValues}
          validationSchema={createPackageDiscountSchema}
          onSubmit={(values: CreatePackagetDiscountType) => {
            updateDiscountSubmitHandler(values);
          }}
        >
          {({ values, setFieldValue, errors }) => {
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
                    title="Select Packages"
                    description="Add product that will have the discount"
                    className="mb-36"
                  >
                    <CustomSelect
                      name="place_branch_packages"
                      label="Packages"
                      options={packageOptions}
                      defaultValue={discount?.packages}
                      placeholder="Packages"
                      getOptionLabel={(option: any) => option.title.english}
                      getOptionValue={(option: any) => option.id}
                      onChange={(selectedOptions: any) => {
                        const selectedIds = selectedOptions.map(
                          (option: any) => option.id
                        );
                        setFieldValue("place_branch_packages", selectedIds);
                      }}
                      noOptionsMessage={() => "Packages are not available"}
                      isMulti
                      isSearchable
                      className="pt-2 col-span-2"
                    />
                    {!packagesDate.isLoading && packageOptions.length === 0 && (
                      <p>No packages found for this branch</p>
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

export default EditPackageDiscount;
