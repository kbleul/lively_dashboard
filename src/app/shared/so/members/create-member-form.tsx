"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import { routes } from "@/config/routes";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import dynamic from "next/dynamic";

import { toast } from "sonner";
import { CreateMemberType, memberSchema } from "@/validations/members";
import PageHeader from "@/app/shared/page-header";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import { DatePicker } from "@/components/ui/datepicker";
import { genderOptions } from "@/constants/form-constants";
import SelectLoader from "@/components/loader/select-loader";
import { useState } from "react";
import CheckMemberExits from "./check-member-exists-form";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const CreateMemberFome = ({
  placeId,
  branchId,
}: {
  placeId: string;
  branchId: string;
}) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const [createNewMemberPhone, setCreateNewMemberPhone] = useState<
    string | null
  >(null);

  const packagesDate = useFetchData(
    [queryKeys.getAllPackages + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-packages/${branchId}`,
    headers
  );

  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.branch["list-members"](placeId, branchId),
        name: "Members",
      },
      {
        name: "Create",
      },
    ],
  };

  const initialValues: CreateMemberType = {
    packages: [],
    first_name: "",
    last_name: "",
    middle_name: "",
    gender: "",
    phone: createNewMemberPhone ? createNewMemberPhone : "",
    dob: undefined,
    email: "",
  };

  const createMemberSubmitHandler = async (values: CreateMemberType) => {
    const dateString = values.dob;
    let formattedDate = "";

    if (dateString) {
      const date = new Date(dateString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      formattedDate = `${year}-${month}-${day}`;
    }

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/add-member`,
        method: "POST",
        headers,
        body: {
          ...values,
          phone: "251" + values.phone,
          dob: formattedDate,
        },
        onSuccess: (res) => {
          toast.success("Member created successfully");
          router.push(
            routes.operationalManager.places["list-members"](placeId, branchId)
          );
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (packagesDate.isFetching || packagesDate.isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }
  const packageOptions: any[] = [];

  packagesDate.data.data.forEach((item: any) => {
    item?.packages?.forEach((packageItem: any) => {
      packageOptions.push(packageItem);
    });
  });

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      {!createNewMemberPhone && (
        <CheckMemberExits
          placeId={placeId}
          branchId={branchId}
          setCreateNewMemberPhone={setCreateNewMemberPhone}
        />
      )}

      {createNewMemberPhone && (
        <div className="@container">
          <Formik
            initialValues={initialValues}
            validationSchema={memberSchema}
            onSubmit={(values: CreateMemberType) => {
              createMemberSubmitHandler(values);
            }}
          >
            {({ values, setFieldValue, errors }) => {
              return (
                <Form className={"[&_label.block>span]:font-medium "}>
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    <FormGroup
                      title="Member Details"
                      description="Add your members details here"
                    >
                      <FormikInput
                        name="first_name"
                        label="First Name"
                        placeholder="Enter first name"
                        color="primary"
                        className="col-span-2"
                      />
                      <FormikInput
                        name="middle_name"
                        label="Middle Name"
                        placeholder="Enter middle name"
                        color="primary"
                        className="col-span-2"
                      />
                      <FormikInput
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter last name"
                        color="primary"
                        className="col-span-2"
                      />
                    </FormGroup>

                    <FormGroup
                      title="More Details"
                      description="Add the member info here"
                    >
                      <Field name="gender">
                        {() => (
                          <Select
                            options={genderOptions}
                            value={values.gender}
                            onChange={(value) => setFieldValue("gender", value)}
                            label="Gender"
                            error={errors?.gender}
                            getOptionValue={(option) => option.name}
                            color="primary"
                          />
                        )}
                      </Field>

                      <Field name="dob">
                        {() => (
                          <div>
                            <DatePicker
                              inputProps={{ label: "Birth Date" }}
                              placeholderText="Select Date"
                              selected={values.dob}
                              onChange={(date) => setFieldValue("dob", date)}
                              showYearDropdown
                            />
                            <ErrorMessage
                              name={"dob"}
                              component="div"
                              className={
                                "text-xs capitalize text-red-500 pt-1 font-medium"
                              }
                            />
                          </div>
                        )}
                      </Field>

                      <FormikInput
                        type="number"
                        label="Phone Number"
                        placeholder="Enter phoneNumber"
                        color="primary"
                        prefix="+251"
                        name="phone"
                        className="col-span-2"
                      />
                      <FormikInput
                        label="Email"
                        placeholder="Enter Email"
                        color="primary"
                        name="email"
                        className="col-span-2"
                      />
                    </FormGroup>

                    <FormGroup
                      title="Select Packages"
                      description="Add packages for member"
                      className="mb-36"
                    >
                      <CustomSelect
                        name="packages"
                        label="Packages"
                        options={packageOptions}
                        placeholder="Packages"
                        getOptionLabel={(option: any) => option.title.english}
                        getOptionValue={(option: any) => option.id}
                        onChange={(selectedOptions: any) => {
                          const selectedIds = selectedOptions.map(
                            (option: any) => option.id
                          );
                          setFieldValue("packages", selectedIds);
                        }}
                        noOptionsMessage={() => "Packages are not available"}
                        isMulti
                        isSearchable
                        className="pt-2 col-span-2"
                      />
                      {!packagesDate.isLoading &&
                        packageOptions.length === 0 && (
                          <p>No packages found for this branch</p>
                        )}
                    </FormGroup>
                  </div>
                  <FormFooter
                    submitBtnText={"Save member info"}
                    showSveBtn={false}
                    isLoading={postMutation.isPending}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CreateMemberFome;
