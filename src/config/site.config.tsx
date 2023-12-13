import { Metadata } from "next";
import logoImg from "@public/logo.png";
// import logoIconImg from "@public/logo-short.svg";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Lively - Expert Dashboard",
  description: `Discover a healthier life with Lively! Find Medicine, Browse Wellness Products, Join Events, Read Articles. Download Lively on Google Play & App Store!`,
  logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Lively ` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Lively` : title,
      description,
      url: "https://lively-expert.vercel.app",
      siteName: "Lively - Expert Dashboard", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "https://lively-landing-o64h8i5v7-unravel.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
