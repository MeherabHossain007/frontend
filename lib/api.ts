import axios, { AxiosResponse } from "axios";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

// Define types for Strapi responses
interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      formats: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

interface HeroSection {
  __component: "sections.hero";
  id: number;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  image: StrapiImage;
}

// Union type for all section types
type Section = HeroSection;

interface PageData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  pageType: "home" | "userType1" | "userType2" | "career" | "generic";
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const api = {
  async getPage(slug: string): Promise<PageData | null> {
    try {
      console.log(slug);
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
export type { PageData, Section, HeroSection };
