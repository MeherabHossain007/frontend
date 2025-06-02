"use client";
import { getGlobalData } from "@/controllers/page/globalController";
import { GlobalData, NavigationItem } from "@/interfaces/page.interface";
import { useState, useEffect, useRef, useCallback } from "react";

export function useNavigationLink() {
  const [data, setData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      console.log("Starting navigation data fetch...");
      const startTime = Date.now();

      const result = await getGlobalData();

      const endTime = Date.now();
      console.log(`Navigation data loaded in ${endTime - startTime}ms`);

      // Only update state if request wasn't aborted
      if (!abortControllerRef.current.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      // Only handle error if request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch global data";
        console.error("Navigation data fetch error:", errorMessage);

        setError(
          err instanceof Error ? err : new Error("Failed to fetch global data")
        );
      }
    } finally {
      // Only update loading state if request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Cleanup function to abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Retry function for error recovery
  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    retry,
    // Helper functions for specific data
    navigation: data?.navigation || [],
    footerLinks: data?.FooterLinks || [],
    socialLinks: data?.socialLinks || [],
  };
}

// Alternative hook for just navigation data (lighter weight)
export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        setLoading(true);
        setError(null);

        // This will use the cached data if available
        const data = await getGlobalData();
        setNavigation(data?.navigation || []);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch navigation")
        );
        console.error("Navigation fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNavigation();
  }, []);

  return { navigation, loading, error };
}
