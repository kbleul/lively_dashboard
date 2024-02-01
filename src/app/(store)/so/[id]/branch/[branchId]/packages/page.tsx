import PackageList from "@/app/shared/so/packages/package-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Products"),
};

const BranchPackages = ({
  params,
}: {
  params: { id: string; branchId: string };
}) => {
  return <PackageList placeId={params.id} branchId={params.branchId} />;
};

export default BranchPackages;
