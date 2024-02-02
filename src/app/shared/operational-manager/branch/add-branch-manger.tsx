"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import { genderOptions } from "@/constants/form-constants";
import cn from "@/utils/class-names";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { DatePicker } from "@/components/ui/datepicker";
import FormikPasswordInput from "@/components/ui/form/password-input";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { toast } from "sonner";
import moment from "moment";
import { BranchManagerType, banchManagerSchema } from "@/validations/branches";
import { Button } from "@/components/ui/button";

import FilePicker from "@/components/ui/form/dropzone";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const AddBranchManger = ({
  className,
  branchId,
  setFormStep,
  setBrachId,
  placeId,
}: {
  className?: string;
  branchId: string;
  setFormStep?: React.Dispatch<React.SetStateAction<number>>;
  setBrachId?: React.Dispatch<React.SetStateAction<string | null>>;
  placeId?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const router = useRouter();

  const initialValues: BranchManagerType = {
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    phone: "",
    dob: undefined,
    email: "",
    password: "",
    profile_image: "",
  };

  const createBranchMangerSubmitHandler = async (values: BranchManagerType) => {
    const formatedDate = moment(values.dob).format("YYYY-MM-DD");
    const newValues = {
      ...values,
      dob: formatedDate,
      phone: "251".concat(values.phone),
      confirm_password: values.password,
      place_branch_id: branchId,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/create-place-branch-manager`,
        method: "POST",
        headers,
        body: {
          ...newValues,
        },
        onSuccess: (res) => {
          toast.success("Branch manager Saved Successfully");

          if (res && res.data && res.data.id) {
            placeId
              ? router.push(
                  routes.operationalManager.places.view(`/${placeId}`)
                )
              : router.push(
                  routes.operationalManager.places["branch-manager"](branchId)
                );

            setFormStep && setFormStep(1);
            setBrachId && setBrachId(null);
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

  const handleSkip = () => {
    placeId
      ? router.push(routes.operationalManager.places.view(`${placeId}`))
      : router.push(
          routes.operationalManager.places["branch-manager"](branchId)
        );
  };

  return (
    <div className="@container">
      <Formik
        initialValues={initialValues}
        validationSchema={banchManagerSchema}
        onSubmit={(values: BranchManagerType) =>
          createBranchMangerSubmitHandler(values)
        }
      >
        {({ errors, values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Manager Info."
                  description="Add your Manager information from here"
                  className={cn(className)}
                >
                  <FormikInput
                    name="first_name"
                    label="First Name"
                    placeholder="Enter First Name"
                    color="primary"
                  />
                  <FormikInput
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    color="primary"
                  />
                  <FormikInput
                    name="username"
                    label="Username"
                    placeholder="Enter username"
                    color="primary"
                    className="col-span-2"
                  />

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
                    label="email"
                    placeholder="Enter Email"
                    color="primary"
                    name="email"
                    className="col-span-2"
                  />

                  <FormikPasswordInput
                    label="Password"
                    placeholder="Enter Password"
                    color="primary"
                    name="password"
                    className="col-span-2"
                  />
                </FormGroup>
                <FormGroup
                  title="Upload Image"
                  description="Upload Expert Profile picture here."
                  className={cn(className)}
                >
                  <FilePicker
                    name="profile_image"
                    label="Logo"
                    className="col-span-2"
                  />
                </FormGroup>
              </div>

              {placeId ? (
                <FormFooter
                  submitBtnText={"Save & Continue"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                  showSkipButton={true}
                  handleSkip={handleSkip}
                  skipBtnText="Skip"
                />
              ) : (
                <FormFooter
                  submitBtnText={"Save & Continue"}
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBranchManger;