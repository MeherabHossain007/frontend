/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  LogRocket?: {
    init: (appId: string) => void;
  };
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
}