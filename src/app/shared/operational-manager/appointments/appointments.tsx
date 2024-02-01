"use client";

import { useState } from "react";
import CustomCategory from "@/components/ui/custom-category";
import ExpertAppointmentList from "./expert-appointment-list";
import PackageBookingList from "./package-booking-list";

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

      {categoryLink === AppointmentCategoriesLink[1].id && (
        <PackageBookingList />
      )}
    </>
  );
};

export default AppointmentsList;
