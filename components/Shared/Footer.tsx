"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Download, Languages } from "lucide-react";
import { useNavigationLink } from "@/lib/hooks/useNavigationLink";
import { useFooterLinks } from "@/lib/hooks/useFooterLinks";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Footer() {
  const { data, loading } = useNavigationLink();
  const { categorizedLinks } = useFooterLinks();

  const getSocialIcon = (platform : string) => {
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
      <footer className="bg-white text-gray-800 py-8">
        <div className="animate-pulse max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-6 bg-gray-300 rounded w-40 mb-10"></div>
          <div className="flex flex-wrap gap-6">
            <div className="h-28 bg-gray-200 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-200 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top part with links */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {/* Logo and social links */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{data?.siteName}</h3>
            </div>
            <div className="flex space-x-4 mb-4">
              {data?.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-colors"
                  aria-label={`${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Link categories - dynamically rendering based on your data */}
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-1">
              <h3 className="font-semibold text-sm uppercase mb-4 text-gray-500">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url || "#"}
                      className="text-sm text-gray-700 hover:text-pink-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App downloads */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase mb-4 text-gray-500">
              Get the app
            </h3>
            <div className="flex flex-col space-y-3">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Download size={16} />
                iOS App
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Download size={16} />
                Android App
              </button>
            </div>
          </div>

          {/* Language switcher */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase mb-4 text-gray-500">
              Language
            </h3>
            <div className="flex items-center">
              <Languages size={16} className="mr-2 text-gray-500" />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Middle separator */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Bottom part with copyright and terms */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap gap-6">
            <p>
              &copy; {new Date().getFullYear()} {data?.siteName}
            </p>
            <Link
              href="/terms"
              className="hover:text-pink-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-pink-600 transition-colors"
            >
              Privacy
            </Link>
          </div>

          <div className="flex gap-6">
            <Link
              href="/sitemap"
              className="hover:text-pink-600 transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-pink-600 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
