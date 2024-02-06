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
  CreatePackagetDiscountType,
  createPackageDiscountSchema,
} from "@/validations/discount";
import moment from "moment";
import { toast } from "sonner";
import PageHeader from "@/app/shared/page-header";

const bannerNeedType = [
  { name: "Yes", value: true },
  { name: "No", value: false },
];

const AddPackageDiscount = ({ className }: { className?: string }) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const packagesData = useFetchData(
    [queryKeys.getAllPackages],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/branch-packages`,
    headers
  );

  const pageHeader = {
    title: "Branch Manager",
    breadcrumb: [
      {
        href: routes.branchManger.productsDiscount,
        name: "Package Discounts",
      },
      {
        name: "Create",
      },
    ],
  };

  const initialValues: CreatePackagetDiscountType = {
    place_branch_packages: [],
    titleEnglish: "",
    descriptionEnglish: "",
    discount: 10,
    promo_code: "",
    tickets: 1,
    start_date: undefined,
    end_date: undefined,
  };

  const createOwnerSubmitHandler = async (
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
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/discount-packages`,
        method: "POST",
        headers,
        body: {
          ...newValues,
        },
        onSuccess: (res) => {
          toast.success("Package Discount Saved Successfully");
          router.push(routes.branchManger.packageDiscount);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (packagesData.isFetching || packagesData.isLoading) return;

  const packageOptions: any[] = [];

  packagesData.data.data.forEach((item: any) => {
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
                    description="Add packages that will have the discount"
                  >
                    <CustomSelect
                      name="place_branch_packages"
                      label="Packages"
                      options={packageOptions}
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
                    {!packagesData.isLoading && packageOptions.length === 0 && (
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

export default AddPackageDiscount;
