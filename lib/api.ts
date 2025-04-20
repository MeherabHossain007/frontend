import { PageData, StrapiResponse } from "@/interfaces/page.interface";
import axios, { AxiosResponse } from "axios";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const api = {
  async getPage(slug: string): Promise<PageData | null> {
    try {
      const response: AxiosResponse<StrapiResponse<PageData[]>> =
        await axios.get(
          `${strapiUrl}/api/pages?filters[slug]=${slug}&populate[sections][populate]=*`
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

  async getAllPageSlugs(): Promise<string[]> {
    try {
      const response: AxiosResponse<
        StrapiResponse<{ attributes: { slug: string } }[]>
      > = await axios.get(`${strapiUrl}/api/pages?fields[0]=slug`);

      return response.data.data.map((page) => page.attributes.slug);
    } catch (error) {
      console.error("Error fetching page slugs:", error);
      return [];
    }
  },
};

export default api;
