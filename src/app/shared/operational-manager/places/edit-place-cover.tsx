"use client";

import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";

import useDynamicMutation from "@/react-query/usePostData";
import { editPlaceLogoType, placesEditCoverSchema } from "@/validations/places";
import Image from "next/image";
import React from "react";
import { Button, Modal, Title } from "rizzui";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import AvaterPicker from "@/components/ui/form/avater-upload";
import { queryKeys } from "@/react-query/query-keys";
import { useQueryClient } from "@tanstack/react-query";

const EditPlaceCover = ({
  isModalOpen,
  setIsModalOpen,
  placeId,
  storeData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeId: string;
  storeData: any;
}) => {
  const queryClient = useQueryClient();

  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "FormData" });

  if (storeData.isFetching) {
    return (
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden"
      >
        {storeData?.isFetching && (
          <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />

            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        )}
      </Modal>
    );
  }

  const initialValues: editPlaceLogoType = {
    logo:
      storeData?.data?.data?.place_logo && storeData?.data?.data?.place_logo.url
        ? storeData?.data?.data?.place_logo.url
        : "",
  };

  const storeInfoSubmitHandler = async (values: editPlaceLogoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/places/${placeId}`,
        method: "POST",
        headers,
        body: {
          place_logo: values.logo,
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Store Logo Updated Successfully");
          setIsModalOpen(false);

          queryClient.invalidateQueries({
            queryKey: [queryKeys.getSinglePlace],
          });
          queryClient.setQueryData([queryKeys.getSinglePlace], null);
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
    <article>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden"
      >
        {!storeData?.isFetching && (
          <Formik
            initialValues={initialValues}
            validationSchema={placesEditCoverSchema}
            onSubmit={(values: editPlaceLogoType) => {
              storeInfoSubmitHandler(values);
            }}
          >
            {({}) => {
              return (
                <Form className={"[&_label.block>span]:font-medium "}>
                  <div className="px-4 py-10 ">
                    <AvaterPicker
                      name="logo"
                      label="Logo"
                      className="col-span-2"
                    />

                    {storeData?.data?.data?.place_logo &&
                      storeData?.data?.data?.place_logo?.url && (
                        <>
                          <p>Current : </p>
                          <Image
                            src={storeData?.data?.data?.place_logo?.url}
                            height={50}
                            width={50}
                            alt="branch covers"
                          />
                        </>
                      )}
                  </div>

                  <div className="w-full flex justify-center items-center mb-4">
                    <Button type="submit" className="min-w-32 bg-green-500">
                      {postMutation.isPending ? "..." : "Save Logo Image"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </Modal>
    </article>
  );
};

export default EditPlaceCover;
