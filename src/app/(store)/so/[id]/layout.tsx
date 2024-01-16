"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import StoreLayout from "@/layouts/store-layout";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;

}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <StoreLayout>{children}</StoreLayout>;
}
