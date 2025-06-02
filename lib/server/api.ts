"use server";

import {
  GlobalData,
  PageData,
  StrapiResponse,
} from "@/interfaces/page.interface";
import { getLocale } from "./locale";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function getPage(slug: string): Promise<PageData | null> {
  const locale = await getLocale();
  if (!locale) {
    console.error("Locale not found");
    return null;
  }

  try {
    const res = await fetch(
      `${strapiUrl}/api/pages?filters[slug]=${slug}&locale=${locale}&customPopulate=nested`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60,
          tags: [`page-${slug}`],
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch page:", res.statusText);
      return null;
    }

    const response: StrapiResponse<PageData[]> = await res.json();
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getGlobalSettings(): Promise<GlobalData | null> {
  try {
    const res = await fetch(`${strapiUrl}/api/global?populate=*`, {
      cache: "force-cache",
      next: {
        revalidate: 60,
        tags: ["global-settings"],
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch global settings:", res.statusText);
      return null;
    }

    const response: StrapiResponse<GlobalData> = await res.json();
    console.log("Global settings fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return null;
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${strapiUrl}/api/pages?fields[0]=slug`, {
      cache: "force-cache",
      next: {
        revalidate: 60,
        tags: ["page-slugs"],
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch page slugs:", res.statusText);
      return [];
    }

    const response: StrapiResponse<PageData[]> = await res.json();
    return response.data.map((page) => page.slug);
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
  }
}
