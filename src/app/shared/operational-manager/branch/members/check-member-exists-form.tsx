"use client";

import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import { routes } from "@/config/routes";
import { useFetchData } from "@/react-query/useFetchData";
import dynamic from "next/dynamic";

import { toast } from "sonner";
import {
  AddPackagesType,
  SearchMemberType,
  searchMemberSchema,
  addPackagesSchema,
} from "@/validations/members";

import { Title } from "rizzui";

import SelectLoader from "@/components/loader/select-loader";
import { useState } from "react";
import Image from "next/image";

const CheckMemberExits = ({
  className,
  placeId,
  branchId,
  setCreateNewMemberPhone,
}: {
  className?: string;
  placeId: string;
  branchId: string;
  setCreateNewMemberPhone: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const router = useRouter();

  const headers = useGetHeaders({ type: "Json" });
  const postMutation = useDynamicMutation();

  const [member, setMember] = useState<any>(null);

  const packagesDate = useFetchData(
    [],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branch-packages/${branchId}`,
    headers,
    member ? true : false
  );

  const initialValues: SearchMemberType = {
    phone: "",
  };

  const initialValuesPackages: AddPackagesType = {
    packages: [],
  };

  const searchMemberSubmitHandler = async (values: SearchMemberType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/find-user?phone=251${values.phone}`,
        method: "GET",
        headers,
        body: {
          ...values,
        },
        onSuccess: (res) => {
          if (res?.data) {
            toast.success("Member found successfully");
            setMember(res?.data);
            return;
          }

          toast.error("Member not found");

          setCreateNewMemberPhone(values.phone);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addPackagesSubmitHandler = async (values: AddPackagesType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/add-existing-member/${member?.id}`,
        method: "POST",
        headers,
        body: {
          ...values,
        },
        onSuccess: (res) => {
          toast.success("Packages added successfully for member  ");

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

  const packageOptions: any[] = [];

  if (
    !packagesDate.isFetching &&
    packagesDate?.data &&
    packagesDate?.data?.data
  )
    packagesDate.data.data.forEach((item: any) => {
      item?.packages?.forEach((packageItem: any) => {
        packageOptions.push(packageItem);
      });
    });

  return (
    <div>
      {/* <CheckUserExistsForm /> */}

      <div className="@container">
        {!member && (
          <Formik
            initialValues={initialValues}
            validationSchema={searchMemberSchema}
            onSubmit={(values: SearchMemberType) => {
              searchMemberSubmitHandler(values);
            }}
          >
            {({}) => {
              return (
                <Form className={"[&_label.block>span]:font-medium "}>
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    <FormGroup
                      title="Search member"
                      description="Check if member is already registered"
                    >
                      <FormikInput
                        type="number"
                        label="Phone Number"
                        placeholder="Enter phone number"
                        color="primary"
                        prefix="+251"
                        name="phone"
                        className="col-span-2"
                      />
                    </FormGroup>
                  </div>
                  <FormFooter
                    submitBtnText={"Search Memeber"}
                    showSveBtn={false}
                    isLoading={postMutation.isPending}
                  />
                </Form>
              );
            }}
          </Formik>
        )}

        {member && (
          <>
            <article className="flex justify-center ">
              <section className="w-fit flex justify-center gap-4 border rounded-xl my-8 py-4 px-8 shadow-sm">
                <div className="w-16 h-16 rounded-full  bg-green-100 overflow-hidden relative ">
                  {member?.profile_image &&
                  !member?.profile_image.includes(
                    "https://ui-avatars.com/api/"
                  ) ? (
                    <Image
                      src={member?.profile_image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt={""}
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div>
                  <Title as="h5" className="text-lg">
                    {member.first_name + " " + member.first_name}
                  </Title>
                  <p className="mt-2">+{member.phone}</p>
                </div>
              </section>
            </article>
            <Formik
              initialValues={initialValuesPackages}
              validationSchema={addPackagesSchema}
              onSubmit={(values: AddPackagesType) => {
                addPackagesSubmitHandler(values);
              }}
            >
              {({ values, setFieldValue, errors }) => {
                return (
                  <Form className={"[&_label.block>span]:font-medium "}>
                    <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
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
                          noOptionsMessage={() => "Loading packages ..."}
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
                      submitBtnText={"Add packages"}
                      showSveBtn={false}
                      isLoading={postMutation.isPending}
                    />
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckMemberExits;
