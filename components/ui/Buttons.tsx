// components/ui/Buttons.tsx
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface GlobalButtonProps {
  text?: string; // Make optional since we're using children
  href: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  showArrow?: boolean; // New prop to control arrow visibility
}

export const PrimaryButton = ({
  text,
  href,
  className = "",
  onClick,
}: GlobalButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        bg-[#432DD7] hover:bg-blue-700 text-white font-extrabold py-3 px-8 rounded-full transition-colors duration-300
        dark:bg-[#2a2a2a] dark:text-white dark:hover:bg-[#333333] dark:border-none dark:font-normal
        dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]
        dark:[text-shadow:0_0_10px_rgba(253,99,143,0.8),0_0_20px_rgba(253,99,143,0.6)]
        dark:hover:[text-shadow:0_0_15px_rgba(253,99,143,1),0_0_25px_rgba(253,99,143,0.8)]
        ${className}
      `}
    >
      {text}
    </Link>
  );
};

export const SecondaryButton = ({
  text,
  href,
  className = "",
  onClick,
  children,
  showArrow = false,
}: GlobalButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center font-extrabold group text-black hover:underline py-3 px-8 rounded-full border-2 border-transparent
        dark:bg-[#2a2a2a] dark:text-[#fd638f] dark:hover:bg-[#333333] dark:no-underline dark:border-none dark:font-normal
        dark:shadow-[inset_0_2px_4px_rgba(253,99,143,0.1)]
        dark:[text-shadow:0_0_10px_rgba(253,99,143,0.8),0_0_20px_rgba(253,99,143,0.6)]
        dark:hover:[text-shadow:0_0_15px_rgba(253,99,143,1),0_0_25px_rgba(253,99,143,0.8)]
        ${className}
      `}
    >
      {children || text}
      {showArrow && (
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
};

export function TextButton({ href, text, className = "" }: GlobalButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-medium text-[#FF00BF] dark:text-[#FF66D9] hover:text-[#D900A6] dark:hover:text-[#FF33CC] hover:underline text-base ${className}`}
    >
      {text}
    </Link>
  );
}
