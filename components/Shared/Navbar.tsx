"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useNavigationLink } from "@/lib/hooks/useNavigationLink";
import { usePathname } from "next/navigation";
import Image from "next/image";
import PaymentSection from "../sections/Payment/PaymentSection";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import DarkModeSwitcher from "../ui/ThemeSwitcher";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { data, loading } = useNavigationLink();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const isActiveLink = (url: string) =>
    (url === "/" && pathname === "/") ||
    (url !== "/" && pathname.startsWith(url));

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-4 animate-pulse">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between h-16 px-4">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center gap-2">
                  {data?.favicon?.url && (
                    <Image
                      src={data.favicon.url}
                      alt={data.siteName}
                      width={40}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  )}
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
              <button
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-full transition duration-150 mr-4"
                onClick={openPaymentModal}
              >
                Get a ride
              </button>
              {data?.navigation?.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`font-semibold text-sm uppercase border-r border-gray-200 dark:border-gray-700 px-6 transition-colors duration-200 ${
                    isActiveLink(item.url)
                      ? "text-pink-500"
                      : "text-gray-900 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center ml-5 gap-3">
                <DarkModeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>

            <button
              className="lg:hidden text-gray-900 dark:text-gray-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {isMenuOpen && (
            <div className="lg:hidden bg-white dark:bg-zinc-900 py-4 px-4 border-t border-gray-200 dark:border-gray-700 shadow-lg">
              <button
                onClick={openPaymentModal}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-full w-full"
              >
                Get a ride
              </button>
              {data?.navigation?.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`font-semibold text-sm uppercase border-b border-gray-200 dark:border-gray-700 py-2 transition-colors duration-200 ${
                    isActiveLink(item.url)
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 rounded-md"
                      : "text-gray-900 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-center gap-3 pt-2">
                <DarkModeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
      </header>
      {isPaymentModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
          <div className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end pr-4 pt-4">
              <button
                onClick={closePaymentModal}
                className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
              >
                <X size={24} className="text-gray-900 dark:text-gray-100" />
              </button>
            </div>
            <div className="p-6">
              <PaymentSection />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
