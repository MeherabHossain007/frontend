"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useNavigationLink } from "@/lib/hooks/useNavigationLink";
import Image from "next/image";
import PaymentSection from "../sections/Payment/PaymentSection";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { data, loading } = useNavigationLink();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closePaymentModal = () => setIsPaymentModalOpen(false);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-4 animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-64"></div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
            <button
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition duration-150 mr-4"
              onClick={openPaymentModal}
            >
              Get a ride
            </button>
            {data?.navigation?.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-900 hover:text-pink-500 font-semibold text-sm uppercase border-r border-gray-200 px-6"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center ml-5">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-900" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white py-4 px-4 border-t border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-4">
              <button
                onClick={openPaymentModal}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full w-full"
              >
                Get a ride
              </button>
              {data?.navigation?.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-900 hover:text-pink-500 font-semibold text-sm uppercase border-b border-gray-200 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto transform transition-all duration-300 animate-scaleIn">
            <div className="flex justify-end p-2">
              <button
                onClick={closePaymentModal}
                className="p-2 rounded-full transition-colors"
              >
                <X size={24} color="#000" />
              </button>
            </div>
            <div className="px-6 pb-8">
              <PaymentSection />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
