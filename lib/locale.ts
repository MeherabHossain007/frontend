import { cookies, headers } from "next/headers";

export async function getLocale(): Promise<string> {
  const cookieLocale = (await cookies()).get("locale")?.value;
  if (cookieLocale && ["en", "fr", "bn"].includes(cookieLocale)) {
    console.log("Cookie locale:", cookieLocale);
    return cookieLocale;
  }

  const accept = (await headers()).get("accept-language");
  const browserLang = accept?.split(",")[0]?.split("-")[0];

  if (browserLang && ["en", "fr", "bn"].includes(browserLang)) {
    console.log("Browser locale:", browserLang);
    return browserLang;
  }

  // fallback to 'en'
  return "en";
}

