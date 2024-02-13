import CreatePackageForm from "@/app/shared/operational-manager/branch/packages/create-package-form";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Packages"),
};

const CreateBranchPackages = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return (
    <CreatePackageForm placeId={params.placeId} branchId={params.branchId} />
  );
};

export default CreateBranchPackages;
