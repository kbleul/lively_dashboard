import React from "react";
import { SlCalender } from "react-icons/sl";

const ClientInfo = ({ userData }: { userData: any }) => {
  return (
    <article>
      <section className="flex justify-start gap-8 items-center">
        <div className="w-[40%]">
          <p className="w-[40%] font-medium text-base mb-1">First Name</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.first_name}
          </p>
        </div>
        <div className="w-[40%]">
          <p className="w-[40%] font-medium text-base mb-1">Last Name</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.last_name}
          </p>
        </div>
      </section>
      <section className="flex justify-start gap-8 items-center mt-6">
        <div className="w-[40%]">
          <p className="w-[40%] font-medium text-base mb-1">Gender</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.gender}
          </p>
        </div>
        <div className="w-[40%]">
          <p className="w-[40%] font-medium text-base mb-1">Birthdate</p>
          <div className="border rounded-md border-black p-3 capitalize font-medium flex justify-between items-center">
            <p>{userData.dob}</p>
            <SlCalender />
          </div>
        </div>
      </section>

      <div className="w-[84%] my-6">
        <p className="w-[40%] font-medium text-base mb-1">Phone Number</p>
        <p className="border rounded-md border-black p-3 capitalize font-medium">
          +{userData.phone}
        </p>
      </div>

      {userData.email && (
        <div className="w-full">
          <p className="w-[40%] font-medium text-base mb-1">Email</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium w-full">
            {userData.email}
          </p>
        </div>
      )}
    </article>
  );
};

export default ClientInfo;
