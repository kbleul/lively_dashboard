"use client";
import React from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { Text } from "@/components/ui/text";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";
import { Formik, Form } from "formik";
import { AdvancedCheckbox } from "@/components/ui/advanced-checkbox";
import { OtherInfoType, otherInfoSchema } from "@/validations/expert-profile";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import CustomSelect from "@/components/ui/form/select";
import FormikInput from "@/components/ui/form/input";
import { RiVidiconLine } from "react-icons/ri";
import { FaPerson } from "react-icons/fa6";
interface Props {}

const MoreInfoForm = ({}: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const profileData = useFetchData(
    [queryKeys.getExpertProfile],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/profile`,
    headers
  );

  console.log(
    Boolean(profileData?.data?.data?.appointment_type?.phone?.active)
  );
  const initialValues: OtherInfoType = {
    occupation: profileData?.data?.data?.occupation?.id,
    specialties: profileData?.data?.data?.specialties
      ?.map((item: any) => item.specialty)
      .map((item: { id: string }) => item.id),
    online:
      Boolean(profileData?.data?.data?.appointment_type?.phone?.active) ??
      false,
    priceInOnline:
      profileData?.data?.data?.appointment_type?.phone?.price ?? "0",
    inperson:
      Boolean(profileData?.data?.data?.appointment_type?.in_person?.active) ??
      false,
    priceInPerson:
      profileData?.data?.data?.appointment_type?.in_person?.price ?? "0",
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
          in_person_active: values.inperson,
          in_person_per_session: values.priceInPerson,
          phone_active: values.online,
          phone_per_session: values.priceInOnline,
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
                    defaultValue={profileData?.data?.data?.specialties?.map(
                      (item: any) => item.specialty
                    )}
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
                {/* in person of price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 col-span-2">
                  <div className="col-span-2">
                    <p className="font-medium">Meeting In</p>
                  </div>
                  <div>
                    <AdvancedCheckbox
                      name="inperson"
                      color="primary"
                      onChange={(e) => {
                        setFieldValue("inperson", e.target.checked);
                        setFieldValue("isOneSelected", e.target.checked);
                      }}
                      className="w-full grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                      inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                    >
                      <FaPerson />
                      <Text className="font-semibold">Inperson</Text>
                    </AdvancedCheckbox>
                    {values.inperson && (
                      <FormikInput
                        type="number"
                        name="priceInPerson"
                        label="Price In Person"
                        className="col-span-2"
                        color="primary"
                      />
                    )}
                  </div>
                  <div>
                    <AdvancedCheckbox
                      name="online"
                      color="primary"
                      onChange={(e) => {
                        setFieldValue("online", e.target.checked);
                        setFieldValue("isOneSelected", e.target.checked);
                      }}
                      className="w-full grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                      inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                    >
                      <RiVidiconLine />
                      <Text className="font-semibold">Online</Text>
                    </AdvancedCheckbox>
                    {values.online && (
                      <FormikInput
                        type="number"
                        name="priceInOnline"
                        label="Price Online"
                        className="col-span-2"
                        color="primary"
                      />
                    )}
                  </div>
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
