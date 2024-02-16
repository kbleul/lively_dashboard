"use client";

import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import {
  specialitySchema,
  SpecialitySchemaVlues,
} from "@/utils/validations/common/speciality.shema";
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

export default function AddSpecilaityForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const specialityData = useFetchData(
    [queryKeys.getSigleSpeciality, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/specialties/${id}`,
    headers,
    !!id
  );

  if (specialityData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: SpecialitySchemaVlues = {
    nameAm: id ? specialityData?.data?.data?.name?.amharic : "",
    nameEn: id ? specialityData?.data?.data?.name?.english : "",
    descriptionAm: id ? specialityData?.data?.data?.description?.amharic : "",
    descriptionEn: id ? specialityData?.data?.data?.description?.english : "",
  };

  const onSubmit: SubmitHandler<SpecialitySchemaVlues> = (data) => {
    createUnit(data);
  };
  const createUnit = async (values: SpecialitySchemaVlues) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/specialties/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/specialties`,
        method: "POST",
        headers,
        body: {
          nameAmharic: values.nameAm,
          nameEnglish: values.nameEn,
          descriptionEnglish: values.descriptionEn,
          descriptionAmharic: values.descriptionAm,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllSpecilities],
          });
          toast.success(
            id
              ? "Speciality Edited Successfully"
              : "Speciality Created Successfully"
          );

          id &&
            queryClient.setQueryData([queryKeys.getSigleSpeciality, id], null);

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
          {id ? "Edit Speciality" : "Add Speciality"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {specialityData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Form<SpecialitySchemaVlues>
          validationSchema={specialitySchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: "onChange",
            defaultValues: initialValues,
          }}
          className="w-full"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              </div>
              <Textarea
                label="English Description"
                placeholder="Enter English Description"
                color="primary"
                className="[&>label>span]:font-medium"
                {...register("descriptionEn")}
                error={errors.descriptionEn?.message}
              />
              <Textarea
                label="Amharic Description"
                placeholder="Enter Amharic Description"
                color="primary"
                className="[&>label>span]:font-medium"
                {...register("descriptionAm")}
                error={errors.descriptionAm?.message}
              />
              <div className="flex items-end justify-end">
                <Button
                  className=""
                  type="submit"
                  size="lg"
                  color="primary"
                  isLoading={postMutation.isPending}
                >
                  {id ? "Edit Speciality" : "Create Speciality"}
                </Button>
              </div>
            </div>
          )}
        </Form>
      )}
    </div>
  );
}
