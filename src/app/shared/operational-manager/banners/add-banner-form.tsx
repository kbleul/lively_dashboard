import React from "react";

import { routes } from "@/config/routes";

import AvaterPicker from "@/components/ui/form/avater-upload";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { BannerType, bannerSchema } from "@/validations/banner";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import { Button } from "rizzui";
import { toast } from "sonner";
import { useModal } from "../../modal-views/use-modal";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/query-keys";

const AddBannerForm = ({ discountId }: { discountId: string }) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });

  const queryClient = useQueryClient();

  const { closeModal } = useModal();

  const router = useRouter();

  const initialValues: BannerType = {
    banner_image: "",
  };

  const bannerSubmitHandler = async (values: BannerType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/add-banner/${discountId}`,
        method: "POST",
        headers,
        body: {
          ...values,
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBanners],
          });

          toast.success("Banner image added Successfully");
          router.push(routes.operationalManager.banners);
          closeModal();
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
        validationSchema={bannerSchema}
        onSubmit={(values) => bannerSubmitHandler(values)}
      >
        {({}) => {
          return (
            <Form className="flex flex-col items-start w-full space-y-3 p-4">
              <div className="w-full">
                <AvaterPicker name={`banner_image`} label="Banner Image" />
              </div>
              <Button
                isLoading={postMutation.isPending}
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
              >
                Add Banner
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBannerForm;
