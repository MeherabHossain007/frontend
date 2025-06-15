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
  const closeMenu = () => setIsMenuOpen(false);

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
    setIsMenuOpen(false); // Always close menu when opening modal
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
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={closeMenu}>
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

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-900 dark:text-gray-100 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <>
              {/* Backdrop for mobile menu */}
              <div
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={closeMenu}
              />

              {/* Mobile menu content */}
              <div className="lg:hidden absolute left-0 right-0 top-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-40">
                <div className="px-4 py-4 space-y-3">
                  {/* Get a ride button */}
                  <button
                    onClick={openPaymentModal}
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-full transition-colors"
                  >
                    Get a ride
                  </button>

                  {/* Navigation links */}
                  <div className="space-y-1">
                    {data?.navigation?.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={closeMenu}
                        className={`block px-4 py-3 rounded-lg font-semibold text-sm uppercase transition-colors duration-200 ${
                          isActiveLink(item.url)
                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                            : "text-gray-900 dark:text-gray-100 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Theme and Language switchers */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <DarkModeSwitcher />
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex items-start sm:items-center justify-center p-4 py-8 sm:py-4">
              <div className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl">
                <div className="sticky top-0 bg-white dark:bg-zinc-800 rounded-t-2xl flex justify-end p-4 z-10">
                  <button
                    onClick={closePaymentModal}
                    className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                    aria-label="Close payment modal"
                  >
                    <X size={24} className="text-gray-900 dark:text-gray-100" />
                  </button>
                </div>
                <div className="p-6 pt-0">
                  <PaymentSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
