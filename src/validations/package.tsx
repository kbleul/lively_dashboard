import * as Yup from "yup";

interface Service {
  name: {
    english: string;
    // Add other language properties if needed
  };
  // Add other properties as needed
}
export const createPackageSchema = Yup.object().shape({
  service_id: Yup.object().required("Service is required"),
  package_category: Yup.string().required("Package Category is required"),
  packages: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Package title is required"),
      description: Yup.string().required("Package Description is required"),
      package_type_id: Yup.string().required("Package type is required"),
      enrollment_type: Yup.string().required("Enrollment type is required"),
      price: Yup.string().required("Price is required"),
      startTime: Yup.string().required("Duration is required"),
      endTime: Yup.string().required("Duration is required"),
      frequency: Yup.string().required("Frequency is required"),
    })
  ),
});

export type CreatePackageType = Yup.InferType<typeof createPackageSchema>;
