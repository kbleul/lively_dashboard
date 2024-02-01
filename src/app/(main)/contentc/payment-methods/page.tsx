import PaymentMethodsList from "@/app/shared/contentc/payment-methods/payment-methods";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Payment Methods"),
};

const page = () => {
  return <PaymentMethodsList />;
};

export default page;
