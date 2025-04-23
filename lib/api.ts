import { GlobalData, PageData, StrapiResponse } from "@/interfaces/page.interface";
import axios, { AxiosResponse } from "axios";
import { getLocale } from "./locale";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL;

const api = {
  async getPage(slug: string): Promise<PageData | null> {
    const locale = await getLocale();
    console.log("Locale:", locale);
    if (!locale) {
      console.error("Locale not found");
      return null;
    }
    try {
      const response: AxiosResponse<StrapiResponse<PageData[]>> =
        await axios.get(
          `${strapiUrl}/api/pages?filters[slug]=${slug}&locale=${locale}&populate[sections][populate]=*`
        );

      if (response.data.data && response.data.data.length > 0) {
        return response.data.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching page:", error);
      return null;
    }
  },

  async getGlobalSettings(): Promise<GlobalData | null> {
    try {
      const response: AxiosResponse<StrapiResponse<GlobalData>> =
        await axios.get(`${strapiUrl}/api/global?populate=*`);

      return response.data.data;
    } catch (error) {
      console.error("Error fetching global settings:", error);
      return null;
    }
  },

  async getAllPageSlugs(): Promise<string[]> {
    try {
      const response: AxiosResponse<StrapiResponse<PageData[]>> = await axios.get(
        `${strapiUrl}/api/pages?fields[0]=slug`
      );

      return response.data.data.map((page) => page.slug);
    } catch (error) {
      console.error("Error fetching page slugs:", error);
      return [];
    }
  },
};

export default api;
