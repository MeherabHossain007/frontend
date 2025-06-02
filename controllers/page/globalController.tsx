// src/api/globalController.ts

import { GlobalData, StrapiResponse } from "@/interfaces/page.interface";
import axios from "axios";


const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
let globalDataCache: GlobalData | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60; // 60s

export const globalController = {
  /**
   * Fetch global settings from Strapi API
   */
  async getGlobalSettings(): Promise<GlobalData | null> {
    // Return cached data if valid
    if (
      globalDataCache &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < CACHE_DURATION
    ) {
      return globalDataCache;
    }

    try {
      const response = await axios.get<StrapiResponse<GlobalData>>(
        `${strapiUrl}/api/global?populate=*`
      );

      // Update cache
      globalDataCache = response.data.data;
      cacheTimestamp = Date.now();

      return response.data.data;
    } catch (error) {
      console.error("Error fetching global settings:", error);
      return null;
    }
  },

  /**
   * Clear the cache
   */
  clearCache() {
    globalDataCache = null;
    cacheTimestamp = null;
  },

  /**
   * Get navigation items
   */
  async getNavigation() {
    const data = await this.getGlobalSettings();
    return data?.navigation || [];
  },

  /**
   * Get footer links grouped by category
   */
  async getFooterLinks() {
    const data = await this.getGlobalSettings();
    return data?.FooterLinks || [];
  },

  /**
   * Get social links
   */
  async getSocialLinks() {
    const data = await this.getGlobalSettings();
    return data?.socialLinks || [];
  },
};

export default globalController;
