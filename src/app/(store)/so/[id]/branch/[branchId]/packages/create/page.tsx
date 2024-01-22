import CreatePackageForm from "@/app/shared/so/packages/create-package/create-package-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Packages"),
};

const CreateBranchPackages = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <CreatePackageForm branchId={params.branchId} />;
};

export default CreateBranchPackages;
