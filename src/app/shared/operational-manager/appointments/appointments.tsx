"use client";

import { useState } from "react";
import ExpertAppointmentList from "./expert-appointment-list";
import PackageBookingList from "./package-booking-list";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import ExpertAppointmentApprovedList from "./approved-expert-appointment-list";
import ApprovedPackageBookingList from "./approved-booking-list";

const CategoriesArr = [
  "Appointments",
  "Approved Appointments",
  "Package Bookings",
  "Approved Package Bookings",
];

const AppointmentsList = () => {
  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  return (
    <>
      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />
      {categoryLink === CategoriesArr[0] && <ExpertAppointmentList />}

      {categoryLink === CategoriesArr[1] && <ExpertAppointmentApprovedList />}

      {categoryLink === CategoriesArr[2] && <PackageBookingList />}

      {categoryLink === CategoriesArr[3] && <ApprovedPackageBookingList />}
    </>
  );
};

export default AppointmentsList;
