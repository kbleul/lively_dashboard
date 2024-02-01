import React from "react";
import { metaObject } from "@/config/site.config";
import ContactList from "@/app/shared/operational-manager/contact/contacts";

export const metadata = {
  ...metaObject("Conatct"),
};

const Speciality = () => {
  return <ContactList />;
};

export default Speciality;
