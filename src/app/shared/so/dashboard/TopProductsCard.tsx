import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
const TopProductsCard = () => {
  return (
    <article className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 gap-x-4 mx-2">
      <section className="flex items-center justify-start gap-4 ">
        <div className="w-12 h-12 bg-gray-100 rounded-md"></div>

        <div>
          <p className="font-semibold text-base md:text-lg">Apple Watch</p>
          <p className="">2000$</p>
        </div>
      </section>

      <div className="self-end md:self-start flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-x-2 ">
          <FaStar color="#fae48e" />
          <FaStar color="#fae48e" />
          <FaStar color="#fae48e" />
          <FaStar color="#fae48e" />
          <FaRegStar color="gray" />
        </div>
        <p className="text-base text-[#7B7B7B] text-semibold">10 reviews</p>
      </div>
    </article>
  );
};

export default TopProductsCard;
