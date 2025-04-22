"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];

    if (cookieLocale && ["en", "fr", "bn"].includes(cookieLocale)) {
      setLocale(cookieLocale);
    }
  }, []);

  const updateLocale = (lang: string) => {
    if (lang === locale) return;
    document.cookie = `locale=${lang}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="p-4">
      <select value={locale} onChange={(e) => updateLocale(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
