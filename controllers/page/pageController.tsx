// src/controllers/pages/pageController.ts
import { PageData } from "@/interfaces/page.interface";
import api from "@/lib/api";


/**
 * Controller for fetching and processing home page data
 */
export async function getHomePageData(): Promise<PageData | null> {
  try {
    const page = await api.getPage("home-page");
    return page;
  } catch (error) {
    console.error("Error fetching home page:", error);
    return null;
  }
}

/**
 * Controller for fetching and processing page data by slug
 */
export async function getPageDataBySlug(
  slug: string
): Promise<PageData | null> {
  try {
    const page = await api.getPage(slug);
    return page;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return null;
  }
}

/**
 * Controller for fetching all page slugs for static path generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const slugs = await api.getAllPageSlugs();
    return slugs;
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
  }
}

/**
 * Controller for processing page metadata
 */
export async function getPageMetadata(slug: string): Promise<{
  title: string;
  description: string;
}> {
  try {
    const page = await api.getPage(slug);

    if (!page) {
      return {
        title: slug === "home-page" ? "Home" : "Page Not Found",
        description:
          slug === "home-page"
            ? "Welcome to our website"
            : "The requested page could not be found.",
      };
    }

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.description || "",
    };
  } catch (error) {
    console.error(`Error getting metadata for ${slug}:`, error);
    return {
      title: "Error",
      description: "An error occurred while loading the page.",
    };
  }
}

/**
 * Controller for rendering sections based on type
 */
export function getSectionComponentType(pageType: string): string {
  const pageTypeMapping: Record<string, string> = {
    home: "HomePageLayout",
    userType1: "UserType1Layout",
    userType2: "UserType2Layout",
    career: "CareerLayout",
  };

  return pageTypeMapping[pageType];
}
