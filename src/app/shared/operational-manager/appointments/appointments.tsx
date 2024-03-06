"use client";

import { useState } from "react";
import PackageBookingList from "./package-booking-list";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import ApprovedPackageBookingList from "./approved-booking-list";

const CategoriesArr = ["Package Bookings", "Approved Package Bookings"];

const BookingsList = () => {
  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  return (
    <>
      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      {categoryLink === CategoriesArr[0] && <PackageBookingList />}

      {categoryLink === CategoriesArr[1] && <ApprovedPackageBookingList />}
    </>
  );
};

export default BookingsList;
