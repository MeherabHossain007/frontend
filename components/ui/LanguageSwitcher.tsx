"use client";

import { Check, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import React from "react";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = React.useMemo(
    () => ({
      en: "English (US)",
      fr: "Français (Canada)",
      pt: "Português (Brasil)",
    }),
    []
  );

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];

    if (cookieLocale && Object.keys(languages).includes(cookieLocale)) {
      setLocale(cookieLocale);
    }
  }, [languages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateLocale = (lang: string) => {
    if (lang === locale) return;
    document.cookie = `locale=${lang}; path=/; max-age=31536000`;
    setLocale(lang);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={16} />
        <span className="font-medium text-sm">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 w-64 z-50">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              className="flex items-center justify-between w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white"
              onClick={() => updateLocale(code)}
            >
              {name}
              {code === locale && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
