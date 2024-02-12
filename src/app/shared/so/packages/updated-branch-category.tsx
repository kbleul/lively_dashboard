"use client";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { queryKeys } from "@/react-query/query-keys";
import { toast } from "sonner";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
import CreatableCustomSelect from "@/components/ui/form/creatable-select";
import {
  UpdatePackageCategoryType,
  updatePackageCatSchema,
} from "@/validations/package";
import Spinner from "@/components/ui/spinner";

interface Props {
  id: string;
  cat: string;
  branchId: string;
}
const UpdatePackageCategoryForm = ({ id, cat, branchId }: Props) => {
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();

  const categoryData = useFetchData(
    [queryKeys.getBranchPackageType],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/package-categories/${branchId}`,
    headers
  );
  const initialVlues: UpdatePackageCategoryType = {
    package_category: cat ?? "",
  };

  //update package
  const createPackage = async (values: UpdatePackageCategoryType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/update-branch-packages-category/${id}`,
        method: "POST",
        headers,
        body: {
          package_category: values.package_category,

          _method: "PATCH",
        },
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackages],
          });
          toast.success("Package Updated Successfully");
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
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Edit Package Category
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {categoryData.isFetched ? (
        <Formik
          initialValues={initialVlues}
          validationSchema={updatePackageCatSchema}
          onSubmit={createPackage}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form className="flex flex-col items-start spave-y-3">
                <CreatableCustomSelect
                  isSearchable
                  name={`package_category`}
                  label="Package Category"
                  options={categoryData?.data?.data?.map((item: any) => ({
                    label: item?.name,
                    value: item?.name,
                  }))}
                  defaultValue={categoryData?.data?.data
                    ?.map((item: any) => ({
                      label: item?.name,
                      value: item?.name,
                    }))
                    ?.find((item: { label: string }) => item.label === cat)}
                  placeholder="select Package Category"
                  getOptionLabel={(tag: any) => tag?.label}
                  getOptionValue={(tag: any) => tag?.value}
                  onChange={(selectedOptions: any) => {
                    setFieldValue(`package_category`, selectedOptions?.value);
                  }}
                  noOptionsMessage={() => "Package type appears here"}
                />

                <div className="flex items-end justify-end w-full pt-20">
                  <Button
                    isLoading={postMutation.isPending}
                    color="primary"
                    size="lg"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Spinner size="xl" />
      )}
    </div>
  );
};

export default UpdatePackageCategoryForm;
