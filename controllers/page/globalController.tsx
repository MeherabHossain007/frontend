// src/api/globalController.ts
"use server";

import { GlobalData } from "@/interfaces/page.interface";
import { getGlobalSettings } from "@/lib/server/api";

// In-memory cache for global data
let globalDataCache: GlobalData | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 1000; // 60 seconds in milliseconds

export async function getGlobalData(): Promise<GlobalData | null> {
  // Return cached data if valid
  if (
    globalDataCache &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    return globalDataCache;
  }

  try {
    // Use the main API controller to avoid duplication
    const data = await getGlobalSettings();

    if (data) {
      // Update cache
      globalDataCache = data;
      cacheTimestamp = Date.now();
    }

    return data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    return globalDataCache; // Return stale cache if available
  }
}

/**
 * Get navigation items with optimized caching
 */
export async function getNavigation() {
  const data = await getGlobalData();
  return data?.navigation || [];
}

/**
 * Get footer links grouped by category
 */
export async function getFooterLinks() {
  const data = await getGlobalData();
  return data?.FooterLinks || [];
}

/**
 * Get social links
 */
export async function getSocialLinks() {
  const data = await getGlobalData();
  return data?.socialLinks || [];
}

/**
 * Preload global data (useful for SSG/SSR optimization)
 */
export async function preloadGlobalData(): Promise<void> {
  try {
    await getGlobalData();
  } catch (error) {
    console.error("Error preloading global data:", error);
  }
}
