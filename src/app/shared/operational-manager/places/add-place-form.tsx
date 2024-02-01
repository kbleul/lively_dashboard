"use client";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import { useModal } from "@/app/shared/modal-views/use-modal";
import FilePicker from "@/components/ui/form/dropzone";
import { PlacesType, placesSchema } from "@/validations/places";
import FormikTextArea from "@/components/ui/form/formik-textarea";

export default function AddPlaceForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "FormData" });

  const placeData = useFetchData(
    [queryKeys.getSinglePlace, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/places/${id}`,
    headers,
    !!id
  );
  const initialValues: PlacesType = {
    owner: "",
    placeType: "",
    nameEn: id ? placeData?.data?.data?.name?.english : "",
    nameAm: id ? placeData?.data?.data?.name?.amharic : "",
    logo: "",
    cover: "",
    descriptionAm: id ? placeData?.data?.data?.description?.amharic : "",
    descriptionEn: id ? placeData?.data?.data?.description?.english : "",
    phone: id ? placeData?.data?.data?.phone : "",
    website: id ? placeData?.data?.data?.website : "",
  };
  const createBrand = async (values: PlacesType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/places/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/places`,
        method: "POST",
        headers,
        body: {
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPlaces],
          });
          toast.success(
            id ? "Place Edited Successfully" : "Place Created Successfully"
          );
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
          {id ? "Edit Place" : "Add Place"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {placeData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={placesSchema}
          onSubmit={createBrand}
        >
          {({}) => {
            return (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormikInput
                  label="Place English Name"
                  placeholder="Enter Place Name"
                  color="primary"
                  name="nameEn"
                />
                <FormikInput
                  label="Place Amharic Name"
                  placeholder="Enter Place Name"
                  color="primary"
                  name="nameAm"
                />
                <FormikInput
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  color="primary"
                  prefix="+251"
                  type="number"
                  name="phone"
                />
                <FormikInput
                  label="Wbsite"
                  placeholder="Enter Website URL"
                  color="primary"
                  prefix="https://"
                  name="website"
                />
                <FormikTextArea
                  label="Description Amharic"
                  placeholder="Enter Amharic Description"
                  color="primary"
                  name="descriptionAm"
                  className="col-span-2"
                />
                <FormikTextArea
                  label="Description English"
                  placeholder="Enter English Description"
                  color="primary"
                  name="descriptionEn"
                  className="col-span-2"
                />

                <FilePicker name="logo" label="Logo" className="col-span-2" />
                <FilePicker name="cover" label="Cover" className="col-span-2" />
                <div className="col-span-2 flex items-end justify-end">
                  <Button
                    color="primary"
                    className="px-10"
                    type="submit"
                    isLoading={postMutation.isPending}
                  >
                    {!id ? "Create" : "Edit"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
