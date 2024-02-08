"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import StoreLayout from "@/layouts/store-layout";

export default function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <StoreLayout placeId={params.id}>{children}</StoreLayout>;
}
