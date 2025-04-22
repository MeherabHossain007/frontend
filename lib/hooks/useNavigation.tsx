import globalController from "@/controllers/page/globalController";
import { GlobalData } from "@/interfaces/page.interface";
import { useState, useEffect } from "react";

export function useNavigation() {
  const [data, setData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await globalController.getGlobalSettings();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch global data")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
