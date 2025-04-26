"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Download, Languages } from "lucide-react";
import { useNavigation } from "@/lib/hooks/useNavigation";
import { useFooterLinks } from "@/lib/hooks/useFooterLinks";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Footer() {
  const { data, loading } = useNavigation();
  const { categorizedLinks } = useFooterLinks();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={24} />;
      case "twitter":
        return <Twitter size={24} />;
      case "linkedin":
        return <Linkedin size={24} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <footer className="bg-[#FFDEDE] text-gray-800 py-12">
        <div className="animate-pulse max-w-[1600px] mx-auto px-6">
          <div className="h-6 bg-gray-600 rounded w-40 mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="h-28 bg-gray-700 rounded"></div>
            <div className="h-28 bg-gray-700 rounded"></div>
            <div className="h-28 bg-gray-700 rounded"></div>
            <div className="h-28 bg-gray-700 rounded"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#FFDEDE] text-gray-800 py-16">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-3xl font-extrabold mb-6">{data?.siteName}</h3>
            <p className="text-xl text-gray-700 mb-6">
              Your reliable ride, anytime, anywhere.
            </p>
            <div className="flex space-x-5">
              {data?.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 transition-colors"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links by Category */}
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-2xl font-bold mb-6 capitalize">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url || "#"}
                      className="text-lg text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get a Ride */}
          <div className="col-span-1">
            <div className="flex justify-start items-center mb-6">
              <Languages size={20} className="mr-2" />
              <LanguageSwitcher />
            </div>
            <h3 className="text-2xl font-bold mb-6">Get a Ride</h3>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
              Book Now
            </button>
            <div className="mt-8">
              <p className="text-xl font-bold mb-4">Download Our App</p>
              <div className="flex flex-col sm:flex-row mt-4 gap-4">
                <button className="flex-1 bg-pink-200 hover:bg-pink-300 text-pink-800 px-6 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors duration-300">
                  <Download size={20} />
                  Android
                </button>
                <button className="flex-1 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors duration-300">
                  <Download size={20} />
                  iOS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-lg text-gray-700 font-medium">
          <p>
            &copy; {new Date().getFullYear()} {data?.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
