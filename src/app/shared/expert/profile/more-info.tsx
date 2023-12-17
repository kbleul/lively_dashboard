"use client";
import React from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";
import { Formik, Form } from "formik";

import { OtherInfoType, otherInfoSchema } from "@/validations/expert-profile";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import CustomSelect from "@/components/ui/form/select";
interface Props {}

const MoreInfoForm = ({}: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const profileData = useFetchData(
    [queryKeys.getExpertProfile],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/profile`,
    headers
  );

  const initialValues: OtherInfoType = {
    occupation: profileData?.data?.data?.occupation?.id,
    specialties: profileData?.data?.data?.specialties?.map(
      (item: { id: string }) => item.id
    ),
  };

  const occupationData = useFetchData(
    [queryKeys.getAllOccupations],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/occupations`,
    headers
  );
  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/specialties`,
    headers
  );

  const updateMoreInfo = async (values: OtherInfoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/update-more-info`,
        method: "POST",
        headers,
        body: {
          occupation_id: values.occupation,
          specialties: values.specialties,
        },
        onSuccess: () => {
          toast.success("Info Updated Successfully");
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
    <Formik
      initialValues={initialValues}
      validationSchema={otherInfoSchema}
      onSubmit={updateMoreInfo}
    >
      {({ values, errors, setFieldValue }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            {profileData.isFetched ? (
              <FormBlockWrapper
                title={"Other Info"}
                description={"Update Your Other Info"}
                className="py-7 @2xl:pt-9 "
              >
                <div className="col-span-2">
                  <CustomSelect
                    isSearchable
                    name="occupation"
                    label="Select occupation"
                    defaultValue={profileData?.data?.data?.occupation}
                    options={occupationData?.data?.data}
                    onChange={(selectedOption) => {
                      setFieldValue("occupation", selectedOption.id);
                    }}
                    placeholder="Select Occupation"
                    getOptionValue={(furnished: any) => furnished?.id}
                    getOptionLabel={(furnished: any) =>
                      furnished?.name?.english
                    }
                    noOptionsMessage={() => "occupation here"}
                  />
                </div>
                <div className="col-span-2">
                  <CustomSelect
                    isMulti
                    isSearchable
                    name="specialties"
                    label="Select specialties"
                    options={specialityData?.data?.data}
                    defaultValue={profileData?.data?.data?.specialties}
                    onChange={(selectedOptions) => {
                      const selectedIds = selectedOptions.map(
                        (option: any) => option.id
                      );
                      setFieldValue("specialties", selectedIds);
                    }}
                    placeholder="Select Specialties"
                    getOptionValue={(speciality: any) => speciality?.id}
                    getOptionLabel={(speciality: any) =>
                      speciality?.name?.english
                    }
                    noOptionsMessage={() => "specialties here"}
                    className="col-span-2"
                  />
                </div>
              </FormBlockWrapper>
            ) : (
              <div>Loading..</div>
            )}
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Update Info"}
            showSveBtn={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MoreInfoForm;
