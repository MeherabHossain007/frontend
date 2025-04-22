"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Download } from "lucide-react";
import { useNavigation } from "@/lib/hooks/useNavigation";
import { useFooterLinks } from "@/lib/hooks/useFooterLinks";

export default function Footer() {
  const { data, loading } = useNavigation();
  const { categorizedLinks } = useFooterLinks();

  // Get social media icon based on platform
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
      <footer className="bg-gray-800 text-white py-8">
        <div className="animate-pulse max-w-[1280px] mx-auto px-4">
          <div className="h-4 bg-gray-600 rounded w-32 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{data?.siteName}</h3>
            <p className="mb-4">Your reliable ride, anytime, anywhere.</p>
            <div className="flex space-x-4">
              {data?.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links by Category */}
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url || "#"}
                      className="hover:text-gray-300 transition-colors"
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
            <h3 className="text-lg font-semibold mb-4">Get a Ride</h3>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full border border-red-500 transition-colors">
              Book Now
            </button>
            <div className="mt-4">
              <p className="text-sm">Download Our App</p>
              <div className="flex mt-2 space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm flex items-center gap-1">
                  <Download size={14} />
                  Android
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm flex items-center gap-1">
                  <Download size={14} />
                  iOS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {data?.siteName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
