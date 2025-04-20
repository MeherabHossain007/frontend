import { Section } from "./section.interface";

export interface PageData {
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

export interface StrapiResponse<T> {
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
