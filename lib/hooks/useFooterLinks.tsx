"use client";
import { useState, useEffect } from "react";
import { useNavigationLink } from "./useNavigationLink";
import { FooterLink } from "@/interfaces/page.interface";

export function useFooterLinks() {
  const { data, loading, error } = useNavigationLink();
  const [categorizedLinks, setCategorizedLinks] = useState<
    Record<string, FooterLink[]>
  >({});

  useEffect(() => {
    if (data?.FooterLinks) {
      const categories: Record<string, FooterLink[]> = {};

      data.FooterLinks.forEach((link) => {
        if (link.title && link.url) {
          const category = link.category || "uncategorized";

          if (!categories[category]) {
            categories[category] = [];
          }

          categories[category].push(link);
        }
      });

      setCategorizedLinks(categories);
    }
  }, [data]);

  return { categorizedLinks, loading, error };
}
