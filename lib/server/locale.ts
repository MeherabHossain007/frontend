"use server";
import { cookies, headers } from "next/headers";

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  if (cookieLocale && ["en", "fr", "pt"].includes(cookieLocale)) {
    console.log("Cookie locale:", cookieLocale);
    return cookieLocale;
  }

  const headerStore = await headers();
  const accept = headerStore.get("accept-language");
  const browserLang = accept?.split(",")[0]?.split("-")[0];

  if (browserLang && ["en", "fr", "pt"].includes(browserLang)) {
    console.log("Browser locale:", browserLang);
    return browserLang;
  }

  // Fallback to 'en'
  return "en";
}
