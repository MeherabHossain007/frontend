// src/api/globalController.ts
"use server";

import { GlobalData } from "@/interfaces/page.interface";
import { getGlobalSettings } from "@/lib/server/api";

// Enhanced in-memory cache with better error handling
let globalDataCache: GlobalData | null = null;
let cacheTimestamp: number | null = null;
let fetchPromise: Promise<GlobalData | null> | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes instead of 1 minute
const STALE_WHILE_REVALIDATE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getGlobalData(): Promise<GlobalData | null> {
  const now = Date.now();

  // Return fresh cache if available
  if (
    globalDataCache &&
    cacheTimestamp &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    return globalDataCache;
  }

  // Return stale cache while revalidating in background
  if (
    globalDataCache &&
    cacheTimestamp &&
    now - cacheTimestamp < STALE_WHILE_REVALIDATE_DURATION
  ) {
    // Start background refresh without waiting
    refreshDataInBackground();
    return globalDataCache;
  }

  // If there's already a fetch in progress, wait for it
  if (fetchPromise) {
    return fetchPromise;
  }

  // Start new fetch
  fetchPromise = fetchGlobalData();

  try {
    const result = await fetchPromise;
    return result;
  } finally {
    fetchPromise = null;
  }
}

async function fetchGlobalData(): Promise<GlobalData | null> {
  try {
    console.log("Fetching global data...");
    const startTime = Date.now();

    // Add timeout to prevent hanging requests
    const timeoutPromise = new Promise<never>(
      (_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000) // 10 second timeout
    );

    const data = await Promise.race([getGlobalSettings(), timeoutPromise]);

    const endTime = Date.now();
    console.log(`Global data fetched in ${endTime - startTime}ms`);

    if (data) {
      globalDataCache = data;
      cacheTimestamp = Date.now();
    }

    return data;
  } catch (error) {
    console.error("Error fetching global data:", error);

    // Return stale cache if available, otherwise null
    if (globalDataCache) {
      console.log("Returning stale cache due to fetch error");
      return globalDataCache;
    }

    return null;
  }
}

// Background refresh function
function refreshDataInBackground(): void {
  fetchGlobalData().catch((error) => {
    console.error("Background refresh failed:", error);
  });
}

/**
 * Get navigation items with optimized caching
 */
export async function getNavigation() {
  try {
    const data = await getGlobalData();
    return data?.navigation || [];
  } catch (error) {
    console.error("Error getting navigation:", error);
    return [];
  }
}

/**
 * Get footer links grouped by category
 */
export async function getFooterLinks() {
  try {
    const data = await getGlobalData();
    return data?.FooterLinks || [];
  } catch (error) {
    console.error("Error getting footer links:", error);
    return [];
  }
}

/**
 * Get social links
 */
export async function getSocialLinks() {
  try {
    const data = await getGlobalData();
    return data?.socialLinks || [];
  } catch (error) {
    console.error("Error getting social links:", error);
    return [];
  }
}

/**
 * Preload global data (useful for SSG/SSR optimization)
 */
export async function preloadGlobalData(): Promise<void> {
  try {
    await getGlobalData();
    console.log("Global data preloaded successfully");
  } catch (error) {
    console.error("Error preloading global data:", error);
  }
}

/**
 * Force refresh cache (useful for admin actions)
 */
export async function refreshGlobalData(): Promise<GlobalData | null> {
  // Clear existing cache
  globalDataCache = null;
  cacheTimestamp = null;

  return getGlobalData();
}
