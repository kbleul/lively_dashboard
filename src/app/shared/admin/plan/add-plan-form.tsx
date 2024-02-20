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
import { createPlanSchema, CreatePlanType } from "@/validations/plan";
import { toast } from "sonner";
import PageHeader from "../../page-header";

const AddPlanForm = ({ className }: { className?: string }) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const pageHeader = {
    title: "Admin",
    breadcrumb: [
      {
        href: routes.admin.plans,
        name: "Plans",
      },
      {
        name: "Create",
      },
    ],
  };

  const initialValues: CreatePlanType = {
    nameEnglish: "",
    nameAmharic: "",
    descriptionEnglish: "",
    descriptionAmharic: "",
    price: 1,
    iteration: 1,
  };

  const createPlanSubmitHandler = async (values: CreatePlanType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/plans`,
        method: "POST",
        headers,
        body: {
          ...values,
          price: values.price.toString(),
        },
        onSuccess: (res) => {
          toast.success("Plan Saved Successfully");
          router.push(routes.admin.plans);
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
          validationSchema={createPlanSchema}
          onSubmit={(values: CreatePlanType) => {
            createPlanSubmitHandler(values);
          }}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form className={"[&_label.block>span]:font-medium "}>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Plan Info."
                    description="Add your plan information here"
                    className={cn(className)}
                  >
                    <FormikInput
                      name="nameEnglish"
                      label="English Name"
                      placeholder="Enter name"
                      color="primary"
                      className="col-span-2"
                    />
                    <FormikInput
                      name="nameAmharic"
                      label="Amharic Name"
                      placeholder="Enter name"
                      color="primary"
                      className="col-span-2"
                    />
                    <FormikTextArea
                      name="descriptionEnglish"
                      label="Description English"
                      placeholder="Write about the plan here"
                      className="col-span-2"
                    />
                    <FormikTextArea
                      name="descriptionAmharic"
                      label="Description Amharic"
                      placeholder="Write about the plan here"
                      className="col-span-2"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Plan Details"
                    description="Add the plan details here"
                  >
                    <FormikInput
                      name={`price`}
                      label="Price"
                      placeholder="Enter Plan Price"
                      type="number"
                      color="primary"
                    />

                    <FormikInput
                      name="iteration"
                      label="Iteration"
                      placeholder="Enter Plan iteration"
                      type="number"
                      color="primary"
                    />
                  </FormGroup>
                </div>
                <FormFooter
                  submitBtnText={"Save Plan"}
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

export default AddPlanForm;
