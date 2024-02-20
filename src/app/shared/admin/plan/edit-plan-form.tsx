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
import { createPlanSchema, CreatePlanType } from "@/validations/plan";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";

const EditPlanForm = ({
  className,
  planId,
}: {
  className?: string;
  planId: string;
}) => {
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
        name: "Edit",
      },
    ],
  };

  const plansDate = useFetchData(
    [queryKeys.getSinglePlan + planId],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/plans/${planId}`,
    headers
  );

  if (plansDate.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const plan = plansDate?.data?.data;

  const initialValues: CreatePlanType = {
    nameEnglish: plan?.name?.english,
    nameAmharic: plan?.name?.amharic,
    descriptionEnglish: plan?.description?.english,
    descriptionAmharic: plan?.description?.amharic,
    price: plan?.price,
    iteration: plan?.iteration,
  };

  const updatePlanSubmitHandler = async (values: CreatePlanType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/plans/${planId}`,
        method: "POST",
        headers,
        body: {
          ...values,
          price: values.price.toString(),
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Plan Updated Successfully");
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
            updatePlanSubmitHandler(values);
          }}
        >
          {({}) => {
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

export default EditPlanForm;
