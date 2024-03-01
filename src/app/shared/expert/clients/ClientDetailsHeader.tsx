import React from "react";
import BgImage from "@public/bg.png";
import Image from "next/image";
import { PiPhoneLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";

const ClientDetailsHeader = ({ userData }: { userData: any }) => {
  return (
    <article>
      <article className="relative">
        <section className="w-full h-[10vh] md:h-[20vh]  overflow-hidden relative">
          <Image
            src={BgImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={""}
          />
        </section>

        <section className="branchlogo flex items-start mt-32 justify-start pl-2 md:pl-10">
          <section className="">
            <section
              className="w-16 h-16 md:w-28 md:h-28 gap-x-4 border-4 border-white  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
              style={{
                backgroundImage: `url('${userData?.profile_image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 100,
              }}
            ></section>
          </section>
        </section>
      </article>

      <section className="mt-8 md:mt-0 md:w-3/4  ml-8 md:ml-56 ">
        <h4 className="font-normal text-2xl py-2">
          {userData?.first_name + " " + userData?.last_name}
        </h4>

        <section className="mb-4 ">
          <div className=" mb-3 flex items-center justify-start gap-x-2 ">
            <CiUser size={20} color="#008579" />
            <p className="text-[#5F5F5F] pt-[0.1rem]">{userData?.username}</p>
          </div>
          <div className=" mb-3 flex items-center justify-start gap-x-2 ">
            <PiPhoneLight size={20} color="#008579" />
            <p className="text-[#5F5F5F] ">+{userData?.phone}</p>
          </div>
        </section>
      </section>
    </article>
  );
};

export default ClientDetailsHeader;
