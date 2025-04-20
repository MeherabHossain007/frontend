"use client";
import { useState } from "react";
import { Gift, Download, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full max-w-[1280px] mx-auto">
      <nav className="flex items-center justify-between px-4 sm:px-6  py-4 text-white ">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-bold text-xl bg-gray-700 px-4 py-2 rounded"
          >
            LOGO
          </Link>
        </div>

        {/* Get a ride button - positioned to the left of the nav items */}
        <div className="hidden md:flex items-end justify-end flex-grow">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-full border border-red-500 whitespace-nowrap mr-6">
            Get a ride
          </button>
        </div>

        {/* Navigation Items - desktop */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          <Link
            href="#"
            className="text-white hover:text-gray-300 border-r border-gray-600 pr-2 lg:pr-6"
          >
            USER1
          </Link>
          <Link
            href="#"
            className="text-white hover:text-gray-300 border-r border-gray-600 pr-2 lg:pr-6"
          >
            USER2
          </Link>
          <button className="text-white hover:text-gray-300 border-r border-gray-600 pr-2 lg:pr-6 flex items-center gap-1">
            <span className="hidden lg:inline">GIFT MODAL</span>
            <span className="lg:hidden">GIFT</span>
          
          </button>
          <button className="text-white hover:text-gray-300 flex items-center gap-1">
            <span className="hidden lg:inline">GET THE ANDROID APP</span>
            <span className="lg:hidden">APP</span>
           
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 py-4 px-4 absolute w-full z-10">
          <div className="flex flex-col space-y-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full border border-red-500 w-full">
              Get a ride
            </button>

            <Link
              href="#"
              className="text-white hover:text-gray-300 py-2 border-b border-gray-600"
            >
              USER1
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-300 py-2 border-b border-gray-600"
            >
              USER2
            </Link>

            <button className="text-white hover:text-gray-300 flex items-center justify-between py-2 border-b border-gray-600">
              <span>GIFT MODAL</span>
              <Gift size={16} />
            </button>

            <button className="text-white hover:text-gray-300 flex items-center justify-between py-2">
              <span>GET THE ANDROID APP</span>
              <Download size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
