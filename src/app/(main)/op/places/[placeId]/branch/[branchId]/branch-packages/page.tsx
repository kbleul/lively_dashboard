import PackageList from "@/app/shared/operational-manager/branch/packages/package-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Packages"),
};

const BranchPackages = ({
  params,
}: {
  params: { placeId: string; branchId: string };
}) => {
  return <PackageList placeId={params.placeId} branchId={params.branchId} />;
};

export default BranchPackages;
