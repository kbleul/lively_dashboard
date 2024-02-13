import CreatePackageForm from "@/app/shared/operational-manager/branch/packages/create-package-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Packages"),
};

const CreateBranchPackages = ({ params }: { params: { branchId: string } }) => {
  return <CreatePackageForm branchId={params.branchId} />;
};

export default CreateBranchPackages;
