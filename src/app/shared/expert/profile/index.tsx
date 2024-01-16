"use client";
import { FaCamera } from "react-icons/fa6";
import { useGetHeaders } from "@/hooks/use-get-headers";
import ProfileNav from "./profile-nav";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Title, Text } from "@/components/ui/text";
import { ActionIcon } from "@/components/ui/action-icon";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Image from "next/image";
const ExpertProfile = () => {
  const headers = useGetHeaders({ type: "Json" });

  const profileData = useFetchData(
    [queryKeys.getExpertProfile],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/profile`,
    headers
  );
  return (
    <div className="@container">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div
          className={
            "lg:col-span-4 w-full flex flex-col items-center space-y-1 sticky top-[68px] z-20"
          }
        >
          <div className="relative inline-flex">
            <Image
              height={200}
              width={200}
              alt="John Doe"
              src={profileData?.data?.data?.user?.profile_image}
              className="rounded-full"
            />
            <ActionIcon
              size="lg"
              rounded="full"
              variant="solid"
              color="primary"
              className="absolute right-5 bottom-4 translate-x-2 translate-y-1.5 scale-[0.65] shadow-lg"
            >
              <FaCamera />
            </ActionIcon>
          </div>
          <Title as="h5">
            {profileData?.data?.data?.user?.first_name}{" "}
            {profileData?.data?.data?.user?.last_name}
          </Title>
          <Text as="p">
            {profileData?.data?.data?.occupation?.name?.english}
          </Text>
          <div className="flex items-center flex-wrap gap-2 border-t pt-2">
            {profileData?.data?.data?.specialties?.map(
              (specialty: {
                id: string;
                specialty: { name: { english: string; amharic: string } };
              }) => (
                <Badge
                  key={specialty.id}
                  color="primary"
                  className="mr-1"
                  variant="outline"
                >
                  {specialty.specialty.name.english}
                </Badge>
              )
            )}
          </div>
        </div>
        <ProfileNav className="lg:col-span-8 w-full" />
      </div>
    </div>
  );
};

export default ExpertProfile;
