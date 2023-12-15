"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
  };
}
export const useFetchData = (
  queryKey: (string | number | boolean | undefined | null | any)[],
  url: string,
  headers: Header["headers"],
  enabled?: boolean
) => {
  const token = "dvasdv";
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await axios.get(
        `${url}`,
        { headers }
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    retry: true,
    enabled: !!token && enabled,
  });
};
