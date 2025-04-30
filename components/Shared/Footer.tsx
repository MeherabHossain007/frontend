"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Download, Languages } from "lucide-react";
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
      <footer className="bg-[#FFDEDE] text-gray-800 py-12">
        <div className="animate-pulse max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="h-6 bg-gray-600 rounded w-40 mb-10"></div>
          <div className="flex flex-wrap gap-6">
            <div className="h-28 bg-gray-700 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-700 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-700 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
            <div className="h-28 bg-gray-700 rounded w-full sm:w-[45%] lg:w-[22%]"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#FFDEDE] text-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-between gap-10 ">
          {/* Company Info */}
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold mb-6">
              {data?.siteName}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6">
              Your reliable ride, anytime, anywhere.
            </p>
            <div className="flex space-x-4">
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
            <div key={category} className="flex flex-col justify-start">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-6 capitalize">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url || "#"}
                      className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get a Ride */}
          <div className="flex flex-col justify-center xl:justify-start xl:items-start xl:text-start items-center text-center">
            <div className="flex justify-center items-center mb-6">
              <Languages size={18} className="mr-2" />
              <LanguageSwitcher />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-6">
              Get a Ride
            </h3>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg">
              Book Now
            </button>
            <div className="mt-8">
              <p className="text-sm sm:text-base font-bold mb-4">
                Download Our App
              </p>
              <div className="flex flex-col sm:flex-row mt-4 gap-4 w-full">
                <button className="w-full sm:w-auto flex-1 bg-pink-200 hover:bg-pink-300 text-pink-800 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-300">
                  <Download size={18} />
                  Android
                </button>
                <button className="w-full sm:w-auto flex-1 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-300">
                  <Download size={18} />
                  iOS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs sm:text-sm text-gray-700 font-medium">
          <p>
            &copy; {new Date().getFullYear()} {data?.siteName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
