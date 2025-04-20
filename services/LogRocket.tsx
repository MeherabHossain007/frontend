// components/integrations/LogRocket.tsx
"use client";
import { useEffect } from "react";

export default function LogRocket() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const LogRocketScript = document.createElement("script");
      LogRocketScript.src = "https://cdn.lgrckt-in.com/LogRocket.min.js";
      LogRocketScript.crossOrigin = "anonymous";

      LogRocketScript.onload = () => {
        if (window.LogRocket) {
          window.LogRocket.init(
            process.env.NEXT_PUBLIC_LOGROCKET_APP_ID || "hresdk/isr-website"
          );
        }
      };

      document.body.appendChild(LogRocketScript);

      return () => {
        if (LogRocketScript.parentNode) {
          document.body.removeChild(LogRocketScript);
        }
      };
    }
  }, []);

  return null;
}
