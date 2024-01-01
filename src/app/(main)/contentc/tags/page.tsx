import TagsList from "@/app/shared/contentc/products/tags/tags-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Tags"),
};

const page = () => {
  return <TagsList />;
};

export default page;
