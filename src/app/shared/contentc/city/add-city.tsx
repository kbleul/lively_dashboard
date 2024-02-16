"use client";

import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  commonToolsSchema,
  CommonToolsSchemaVlues,
} from "@/utils/validations/common/tools.schema";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";

import { useQueryClient } from "@tanstack/react-query";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useModal } from "../../modal-views/use-modal";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import Loading from "../products/tags/Loading";

export default function AddCityForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const onSubmit: SubmitHandler<CommonToolsSchemaVlues> = (data) => {
    createUnit(data);
  };
  const cityData = useFetchData(
    [queryKeys.getSingleCity, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/cities/${id}`,
    headers,
    !!id
  );

  if (cityData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: CommonToolsSchemaVlues = {
    nameAm: id ? cityData?.data?.data?.name?.amharic : "",
    nameEn: id ? cityData?.data?.data?.name?.english : "",
  };
  const createUnit = async (values: CommonToolsSchemaVlues) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/cities/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/cities`,
        method: "POST",
        headers,
        body: {
          nameAmharic: values.nameAm,
          nameEnglish: values.nameEn,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.getAllCities] });
          toast.success(
            id ? "City Edited Successfully" : "City Created Successfully"
          );

          id && queryClient.setQueryData([queryKeys.getSingleCity, id], null);

          closeModal();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
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
          {id ? "Edit City" : "Add City"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {cityData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Form<CommonToolsSchemaVlues>
          validationSchema={commonToolsSchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: "onChange",
            defaultValues: initialValues,
          }}
          className="w-full"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5 w-full">
              <Input
                type="text"
                size="lg"
                label="Amharic Name"
                placeholder="Enter Amharic Name"
                color="primary"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register("nameAm")}
                error={errors.nameAm?.message}
              />
              <Input
                type="text"
                size="lg"
                label="English Name"
                placeholder="Enter English Name"
                color="primary"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register("nameEn")}
                error={errors.nameEn?.message}
              />
              <Button
                className="w-full hover:bg-primary"
                type="submit"
                size="lg"
                color="primary"
                isLoading={postMutation.isPending}
              >
                {id ? "Edit" : "Create"}
              </Button>
            </div>
          )}
        </Form>
      )}
    </div>
  );
}
