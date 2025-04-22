import { Section, StrapiImage } from "./section.interface";

export interface PageData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  pageType: "home" | "userType1" | "userType2" | "career" | "generic";
  locale: string;
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

export interface GlobalData {
  id: number;
  documentId: string;
  siteName: string;
  favicon: StrapiImage;
  navigation: NavigationItem[];
  FooterLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export interface NavigationItem {
  id: number;
  label: string;
  url: string;
}

export interface FooterLink {
  id: number;
  title: string | null;
  url: string | null;
  category: string | null;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}