// src/controllers/pages/pageController.ts
"use server";

import { PageData } from "@/interfaces/page.interface";
import { getPage, getAllPageSlugs as getPageSlugs } from "@/lib/server/api";

/**
 * Controller for fetching and processing home page data
 */
export async function getHomePageData(): Promise<PageData | null> {
  try {
    const page = await getPage("home-page");
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
    const page = await getPage(slug);
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
    const slugs = await getPageSlugs();
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
    const page = await getPage(slug);

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
 * Enhanced controller for getting page data with metadata
 */
export async function getPageWithMetadata(slug: string): Promise<{
  page: PageData | null;
  metadata: {
    title: string;
    description: string;
  };
}> {
  try {
    const [page, metadata] = await Promise.all([
      getPage(slug),
      getPageMetadata(slug),
    ]);

    return {
      page,
      metadata,
    };
  } catch (error) {
    console.error(`Error fetching page with metadata for ${slug}:`, error);
    return {
      page: null,
      metadata: {
        title: "Error",
        description: "An error occurred while loading the page.",
      },
    };
  }
}

/**
 * Controller for batch fetching multiple pages
 */
export async function getMultiplePages(slugs: string[]): Promise<{
  [slug: string]: PageData | null;
}> {
  try {
    const pagePromises = slugs.map(async (slug) => ({
      slug,
      page: await getPage(slug),
    }));

    const results = await Promise.all(pagePromises);

    return results.reduce((acc, { slug, page }) => {
      acc[slug] = page;
      return acc;
    }, {} as { [slug: string]: PageData | null });
  } catch (error) {
    console.error("Error fetching multiple pages:", error);
    return {};
  }
}

/**
 * Controller for validating if a page exists
 */
export async function validatePageExists(slug: string): Promise<boolean> {
  try {
    const page = await getPage(slug);
    return page !== null;
  } catch (error) {
    console.error(`Error validating page existence for ${slug}:`, error);
    return false;
  }
}
