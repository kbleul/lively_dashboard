"use client";

import { useState } from "react";
import CustomCategory from "@/components/ui/custom-category";
import ExpertAppointmentList from "./expert-appointment-list";

const AppointmentCategoriesLink = [
  {
    id: "expert-appointment-requests", //for api
    name: "Expert Appointments",
  },
  {
    id: "booking-requests",
    name: "Package Bookings",
  },
];

const AppointmentsList = () => {
  const [categoryLink, setCategoryLink] = useState(
    AppointmentCategoriesLink[0].id
  );

  return (
    <>
      <CustomCategory
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesLinks={AppointmentCategoriesLink}
      />
      {categoryLink === AppointmentCategoriesLink[0].id && (
        <ExpertAppointmentList />
      )}
    </>
  );
};

export default AppointmentsList;
