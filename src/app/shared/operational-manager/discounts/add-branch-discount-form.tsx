"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import { routes } from "@/config/routes";
import cn from "@/utils/class-names";

import moment from "moment";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import {
  CreateBranchDiscountType,
  createBranchDiscountSchema,
} from "@/validations/discount";

const AddBranchDiscount = ({
  className,
  branchId,
}: {
  className?: string;
  branchId: string;
}) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const pageHeader = {
    title: "Operations Manager",
    breadcrumb: [
      {
        href: routes.operationalManager.places["branch-discounts"](branchId),
        name: "Branch Discounts",
      },
      {
        name: "Create",
      },
    ],
  };

  const initialValues: CreateBranchDiscountType = {
    titleEnglish: "",
    descriptionEnglish: "",
    discount: 10,
    promo_code: "",
    tickets: 1,
    start_date: undefined,
    end_date: undefined,
  };

  const createOwnerSubmitHandler = async (values: CreateBranchDiscountType) => {
    const formatedStartDate = moment(values.start_date).format("YYYY-MM-DD");
    const formatedEndDate = moment(values.end_date).format("YYYY-MM-DD");

    const newValues = {
      ...values,
      start_date: formatedStartDate,
      end_date: formatedEndDate,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/discount-place-branch`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          place_branch_id: branchId,
          need_banner: false,
        },
        onSuccess: (res) => {
          toast.success("Discount Saved Successfully");
          router.push(
            routes.operationalManager.places["branch-discounts"](branchId)
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
          validationSchema={createBranchDiscountSchema}
          onSubmit={(values: CreateBranchDiscountType) => {
            createOwnerSubmitHandler(values);
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

export default AddBranchDiscount;
