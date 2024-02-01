import LanguageList from "@/app/shared/contentc/language/language";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Languages"),
};

const page = () => {
  return <LanguageList />;
};

export default page;
