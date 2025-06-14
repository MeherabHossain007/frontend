"use client";
import Link from "next/link";

export default function SubNav() {
  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex space-x-6 overflow-x-auto py-3">
          <Link
            href="#openings"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hover:text-[#FF00BF]"
          >
            See open jobs
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hover:text-[#FF00BF]"
          >
            Life at Lyft
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hover:text-[#FF00BF]"
          >
            Belonging at Lyft
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hover:text-[#FF00BF]"
          >
            Early Talent Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
