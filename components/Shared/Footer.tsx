"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useNavigationLink } from "@/lib/hooks/useNavigationLink";
import { useFooterLinks } from "@/lib/hooks/useFooterLinks";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Footer() {
  const { data, loading } = useNavigationLink();
  const { categorizedLinks } = useFooterLinks();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-8">
        <div className="animate-pulse max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-10"></div>
          <div className="flex flex-wrap gap-6">
            <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-12 pb-8 border-t border-gray-200 dark:border-gray-700 shadow-[inset_0_10px_30px_rgba(0,0,0,0.10)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Dynamic columns of links from categorizedLinks */}
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {category.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url || "#"}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App downloads and language selector */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Link
                href="#"
                className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full text-center"
              >
                Lyft driver app
              </Link>
              <Link
                href="#"
                className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full text-center"
              >
                Lyft rider app
              </Link>
            </div>

            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom part with copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-wrap gap-6">
            <Link
              href="/terms"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Accessibility Statement
            </Link>
            <Link
              href="/privacy-choices"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Your Privacy Choices
            </Link>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <p>
              © {new Date().getFullYear()} {data?.siteName || "Lyft"}, Inc.
            </p>
            <p>CPUC ID No. TCP0032513-P</p>

            <div className="flex gap-4">
              {data?.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
