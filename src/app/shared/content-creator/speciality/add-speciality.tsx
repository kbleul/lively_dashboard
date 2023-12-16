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
const initialValues: SpecialitySchemaVlues = {
  nameAm: "",
  nameEn: "",
  descriptionAm: "",
  descriptionEn: "",
};

export default function AddSpecilaityForm() {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const onSubmit: SubmitHandler<SpecialitySchemaVlues> = (data) => {
    createUnit(data);
  };
  const createUnit = async (values: SpecialitySchemaVlues) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}specialties`,
        method: "POST",
        headers,
        body: {
          nameAmharic: values.nameAm,
          nameEnglish: values.nameEn,
          descriptionEnglish: values.descriptionEn,
          descriptionAmharic: values.descriptionAm,
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllSpecilities],
          });
          toast.success("Speciality Created Successfully");
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
          Add Speciality
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
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
                color="info"
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
                color="info"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register("nameEn")}
                error={errors.nameEn?.message}
              />
            </div>
            <Textarea
              label="English Description"
              placeholder="Enter English Description"
              color="info"
              className="[&>label>span]:font-medium"
              {...register("descriptionEn")}
              error={errors.descriptionEn?.message}
            />
            <Textarea
              label="Amharic Description"
              placeholder="Enter Amharic Description"
              color="info"
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
                Create Speciality
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
