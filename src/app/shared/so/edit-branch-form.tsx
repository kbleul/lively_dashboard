"use client";
import LogoImage from "@public/logo.png";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import {
  NewValues,
  branchInfoEditSchema,
  branchInfoEditType,
} from "@/validations/branches";

import React, { useState } from "react";
import cn from "@/utils/class-names";

import { Formik, Form } from "formik";

import { toast } from "sonner";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import FormFooter from "@/components/form-footer";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Button, Modal, Title } from "rizzui";
import Image from "next/image";
import { workCustomDays } from "@/constants/form-constants";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import EditMoreInfo from "./edit-more-info";
import LocationForm from "./LocationForm";
import { useQueryClient } from "@tanstack/react-query";
import AvaterPicker from "@/components/ui/form/avater-upload";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import CustomSelect from "@/components/ui/form/select";
import { deliverySupportType } from "../operational-manager/branch/add-branch";

const BranchFormStepLink = ["places", "incomplete-places"];
const BranchFormStepLabels = ["Branch Detail", "More Info."];

const getSelectedDays = (selectedDaysArr: any[]): boolean[] => {
  const selectedDays = Array(7).fill(false);

  const days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };
  selectedDaysArr.forEach((day) => {
    const day_of_week: "Monday" = day.day_of_week;
    selectedDays[days[day_of_week]] = true;
  });

  return selectedDays;
};

const prepareInitialOpeningHours = (
  opening_hours: any[]
): typeof workCustomDays => {
  const workCustomDaysUpdated = [...workCustomDays]; // Make a copy of workCustomDays

  opening_hours.forEach((item) => {
    let selectedDay = workCustomDaysUpdated.find(
      (day) => day.day === item.day_of_week
    );

    if (selectedDay) {
      selectedDay.isActive = true;
      selectedDay.from = item.opening_time;
      selectedDay.to = item.closing_time;
    }
  });

  return workCustomDaysUpdated;
};

const EditBranchForm = ({
  placeId,
  branchId,
  className,
}: {
  placeId: string;
  branchId: string;
  className?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const [categoryLink, setCategoryLink] = React.useState(BranchFormStepLink[0]);

  const [customDaysChecked, setCustomDaysChecked] = React.useState(
    Array(7).fill(false)
  );

  const queryClient = useQueryClient();

  const branchManagersData = useFetchData(
    [queryKeys.getSingleBranch + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-detail/${branchId}`,
    headers
  );

  const handleCancle = () => {
    router.push(routes.storeOwner.branches(placeId));
  };

  const branchInfoSubmitHandler = async (values: branchInfoEditType) => {
    const {
      amenities,
      branch_cover,
      descriptionAmharic,
      descriptionEnglish,
      general_discount,
      has_delivery,
      facebook,
      instagram,
      latitude,
      longitude,
      nameAmharic,
      nameEnglish,
      services,
      telegram,
      whatsapp,
    } = values;

    const newValues: NewValues = {
      amenities,
      descriptionAmharic,
      descriptionEnglish,
      general_discount,
      has_delivery,
      facebook,
      instagram,
      latitude,
      longitude,
      nameAmharic,
      nameEnglish,
      services,
      telegram,
      whatsapp,
      phone: "251".concat(values.phone),
      specific_address: values.specific_address ? values.specific_address : "",
    };

    if (values.website !== "") {
      newValues.website = "https://" + values.website;
    }

    if (typeof branch_cover !== "string") {
      newValues.branch_cover = branch_cover;
    }

    const openingHoursToSend: {
      day_of_week: string;
      opening_time: string;
      closing_time: string;
    }[] = [];

    values.openingHours.map((openHours, index) => {
      customDaysChecked[index] &&
        openingHoursToSend.push({
          day_of_week: openHours.day,
          opening_time:
            openHours.from.split(":").length < 3
              ? openHours.from + ":00"
              : openHours.from,
          closing_time:
            openHours.to.split(":").length < 3
              ? openHours.to + ":"
              : openHours.to,
        });
    });

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/place-branches/${branchId}`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          opening_hours: [...openingHoursToSend],
          openingHours: [],
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Store Branch Information Updated Successfully");
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getSingleBranch + branchId],
          });

          if (res.data && res.data.place) {
            categoryLink === BranchFormStepLink[0]
              ? setCategoryLink(BranchFormStepLink[1])
              : router.push(routes.storeOwner.branches(placeId));
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (
    branchManagersData?.isFetching ||
    branchManagersData?.isLoading ||
    branchManagersData?.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const ManagerData = branchManagersData.data.data;

  const initialValues: branchInfoEditType = {
    nameEnglish: ManagerData.name.english,
    nameAmharic: ManagerData.name.amharic,
    descriptionEnglish: ManagerData.description.english,
    descriptionAmharic: ManagerData.description.amharic,
    phone: ManagerData.phone.substring(3),
    general_discount: ManagerData.general_discount,
    has_delivery: ManagerData.has_delivery ? 1 : 0,
    telegram: ManagerData.socials?.telegram
      ? ManagerData.socials?.telegram
      : "",
    facebook: ManagerData.socials?.telegram
      ? ManagerData.socials?.telegram
      : "",
    whatsapp: ManagerData.socials?.telegram
      ? ManagerData.socials?.telegram
      : "",
    website: ManagerData.socials?.telegram ? ManagerData.socials?.telegram : "",
    instagram: ManagerData.socials?.telegram
      ? ManagerData.socials?.telegram
      : "",
    latitude: ManagerData.location.latitude,
    longitude: ManagerData.location.longitude,
    branch_cover:
      branchManagersData?.data?.data?.branch_cover &&
      branchManagersData.data.data.branch_cover.url
        ? branchManagersData.data.data.branch_cover.url
        : undefined,
    specific_address: ManagerData?.location?.specific_address
      ? ManagerData?.location?.specific_address
      : "",
    services: ManagerData.services.map((item: any) => item.id),
    amenities: ManagerData.amenities.map((item: any) => item.id),
    openingHours: prepareInitialOpeningHours(ManagerData?.opening_hours),
  };

  return (
    <article>
      <Formik
        initialValues={initialValues}
        validationSchema={branchInfoEditSchema}
        onSubmit={(values: branchInfoEditType) => {
          branchInfoSubmitHandler(values);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <article className="relative mb-8">
                {values.branch_cover && (
                  <section
                    className=" w-full h-[15vh] md:h-[23vh] bg-[#9bfab1] rounded-3xl overflow-hidden relative flex justify-center items-center"
                    style={{
                      backgroundImage: `url('${values.branch_cover}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Button
                      type="button"
                      color="primary"
                      className="w-[200px] text-black py-2  @xl:w-auto bg-gray-100  my-4"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Change Cover
                    </Button>
                  </section>
                )}

                {!values.branch_cover && (
                  <section
                    className=" w-full h-[15vh] md:h-[23vh] bg-[#9bfab1] rounded-3xl overflow-hidden relative flex justify-center items-center"
                    style={{
                      backgroundImage:
                        ManagerData.branch_cover && ManagerData.branch_cover.url
                          ? `url('${ManagerData.branch_cover.url}')`
                          : `url(${LogoImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Button
                      type="button"
                      color="primary"
                      className="w-[200px] text-black py-2  @xl:w-auto bg-gray-100  my-4"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Change Cover
                    </Button>
                  </section>
                )}
              </article>

              <CustomCategoryButton
                categoryLink={categoryLink}
                setCategoryLink={setCategoryLink}
                categoriesArr={BranchFormStepLink}
                labels={BranchFormStepLabels}
              />

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
                containerClassName="dark:bg-gray-100/90 overflow-hidden"
              >
                <div className="px-4 py-10 ">
                  <AvaterPicker
                    name="branch_cover"
                    label="Branch Cover"
                    className="col-span-2"
                  />

                  {ManagerData.branch_cover && ManagerData.branch_cover.url && (
                    <>
                      <p>Current : </p>
                      <Image
                        src={ManagerData.branch_cover.url}
                        height={50}
                        width={50}
                        alt="branch covers"
                      />
                    </>
                  )}
                </div>
              </Modal>

              <div className="@container">
                {categoryLink === BranchFormStepLink[0] && (
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    <FormGroup
                      title="Branch detail"
                      description="Edit your branch detail from here"
                      className={cn(className)}
                    >
                      <FormikInput
                        name="nameEnglish"
                        label="Branch Name"
                        placeholder="Enter Branch Name"
                        color="primary"
                      />
                      <FormikInput
                        name="nameAmharic"
                        label="የቤቱ ስም "
                        placeholder="ስም ኣስገባ"
                        color="primary"
                      />
                      <FormikTextArea
                        label="About Branch"
                        placeholder="Write about the place"
                        color="primary"
                        name="descriptionEnglish"
                        className="col-span-2"
                      />
                      <FormikTextArea
                        label="About Branch (Amharic)"
                        placeholder="Write about the place"
                        color="primary"
                        name="descriptionAmharic"
                        className="col-span-2"
                      />
                    </FormGroup>

                    <FormGroup
                      title="General Discount"
                      description="Add general discount percentage here"
                      className={cn(className)}
                    >
                      <FormikInput
                        name={`general_discount`}
                        label="Discount"
                        placeholder="Enter Your Discount Amount"
                        suffix="%"
                        type="number"
                        color="primary"
                      />
                    </FormGroup>

                    <FormGroup
                      title="Delivery Support"
                      description="Does this branch support delivery ?"
                      className={cn(className)}
                    >
                      <CustomSelect
                        name="has_delivery"
                        label="Delivery Supported ?"
                        options={deliverySupportType}
                        defaultValue={
                          ManagerData.has_delivery
                            ? deliverySupportType[0]
                            : deliverySupportType[1]
                        }
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.value}
                        onChange={(selectedOptions: any) => {
                          setFieldValue("has_delivery", selectedOptions.value);
                        }}
                        noOptionsMessage={() => "Delivery Support loading..."}
                        className="pt-2 col-span-2"
                      />
                    </FormGroup>

                    <FormGroup
                      title="Address Info."
                      description="You can add your address here."
                      className={cn(className)}
                    >
                      <FormikInput
                        type="number"
                        label="Phone Number"
                        placeholder="Enter phoneNumber"
                        color="primary"
                        prefix="+251"
                        name="phone"
                        className="col-span-2"
                      />
                      <div className="col-span-2">
                        <FormikInput
                          name="specific_address"
                          label="Specific Address"
                          placeholder="Eg. Bole Road next to Edna mall, Addis Ababa, Ethiopia"
                          color="primary"
                        />
                      </div>
                    </FormGroup>
                    <FormGroup
                      title="Branch Location"
                      description="Add branch location here"
                      className={cn(className)}
                    >
                      <LocationForm
                        initialCityValue={
                          ManagerData?.city && ManagerData?.city
                            ? ManagerData?.city
                            : null
                        }
                      />
                    </FormGroup>

                    <FormGroup
                      title="Social Media "
                      description="You can add your social media links here."
                      className={cn(className)}
                    >
                      <FormikInput
                        name={`telegram`}
                        label="Telegram"
                        placeholder="Enter Your Telegram Username"
                        prefix="t.me//"
                        type="text"
                        color="primary"
                      />
                      <FormikInput
                        name={`facebook`}
                        label="Facebook"
                        placeholder="Enter Your Facebook Username"
                        type="text"
                        color="primary"
                      />
                      <FormikInput
                        name={`whatsapp`}
                        label="Watsapp"
                        placeholder="Enter Your Watsapp Number"
                        prefix="+251"
                        type="number"
                        color="primary"
                      />
                      <FormikInput
                        name={`website`}
                        label="Website"
                        placeholder="lively-et.com"
                        prefix="https://"
                        type="text"
                        color="primary"
                      />
                      <FormikInput
                        name={`instagram`}
                        label="Instagram"
                        placeholder="Enter Your Instagram Username"
                        type="text"
                        color="primary"
                      />
                    </FormGroup>
                  </div>
                )}

                {categoryLink === BranchFormStepLink[1] && (
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    <EditMoreInfo
                      initialServices={ManagerData.services}
                      initialAmenities={ManagerData.amenities}
                      customDaysChecked={customDaysChecked}
                      setCustomDaysChecked={setCustomDaysChecked}
                      initialOpeningHours={getSelectedDays(
                        ManagerData.opening_hours
                      )}
                    />
                  </div>
                )}
                <FormFooter
                  submitBtnText={"Save Updates"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                  showSkipButton
                  handleSkip={handleCancle}
                  skipBtnText="Cancel"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default EditBranchForm;
