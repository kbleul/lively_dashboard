"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import {
  NewValues,
  branchInfoEditSchema,
  branchInfoEditType,
} from "@/validations/branches";

import React from "react";
import cn from "@/utils/class-names";

import { Formik, Form } from "formik";

import { toast } from "sonner";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import LocationForm from "./LocationForm";
import AvaterPicker from "@/components/ui/form/avater-upload";
import FormFooter from "@/components/form-footer";
import PageHeader from "../../page-header";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import Image from "next/image";
import EditMoreInfo from "./edit-more-info";
import { workCustomDays } from "@/constants/form-constants";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

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

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.operationalManager.places.list,
      name: "Stores",
    },
    {
      name: "Branch",
    },
    {
      name: "Edit Branch",
    },
  ],
};

const EditBranchForm = ({
  branchId,
  className,
}: {
  branchId: string;
  className?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const router = useRouter();

  const [customDaysChecked, setCustomDaysChecked] = React.useState(
    Array(7).fill(false)
  );
  const branchManagersData = useFetchData(
    [queryKeys.getSingleBranch],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/place-branches/${branchId}`,
    headers
  );

  const branchInfoSubmitHandler = async (values: branchInfoEditType) => {
    const {
      amenities,
      branch_cover,
      descriptionAmharic,
      descriptionEnglish,
      general_discount,
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
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/place-branches/${branchId}`,
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
          if (res.data && res.data.place) {
            router.push(
              routes.operationalManager.places.view(res.data.place.id)
            );
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <Formik
          initialValues={initialValues}
          validationSchema={branchInfoEditSchema}
          onSubmit={(values: branchInfoEditType) => {
            branchInfoSubmitHandler(values);
          }}
        >
          {({ errors, values, setFieldValue }) => {
            return (
              <Form className={"[&_label.block>span]:font-medium "}>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Store Info."
                    description="Add your Store information from here"
                    className={cn(className)}
                  >
                    <FormikInput
                      name="nameEnglish"
                      label="Place Name"
                      placeholder="Enter Place Name"
                      color="primary"
                    />
                    <FormikInput
                      name="nameAmharic"
                      label="ስም"
                      placeholder="ስም ኣስገባ"
                      color="primary"
                    />
                    <FormikTextArea
                      label="About Place"
                      placeholder="Write about the place"
                      color="primary"
                      name="descriptionEnglish"
                      className="col-span-2"
                    />
                    <FormikTextArea
                      label="About Place (Amharic)"
                      placeholder="Write about the place"
                      color="primary"
                      name="descriptionAmharic"
                      className="col-span-2"
                    />

                    <FormikInput
                      type="number"
                      label="Phone Number"
                      placeholder="Enter phoneNumber"
                      color="primary"
                      prefix="+251"
                      name="phone"
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
                    title="Specific Address"
                    description="Add a short detailed address"
                    className={cn(className)}
                  >
                    <div className="col-span-2">
                      <FormikInput
                        name="specific_address"
                        label="Address"
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
                    title="Upload Branch Cover"
                    description="Upload your Store logo image  here"
                    className={cn(className)}
                  >
                    <AvaterPicker
                      name="branch_cover"
                      label="Branch Cover"
                      className="col-span-2"
                    />

                    {ManagerData.branch_cover &&
                      ManagerData.branch_cover.url && (
                        <Image
                          src={ManagerData.branch_cover.url}
                          height={100}
                          width={100}
                          alt="branch covers"
                        />
                      )}
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
                <FormFooter
                  submitBtnText={"Save Updates"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </article>
  );
};

export default EditBranchForm;
