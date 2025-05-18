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

export const PrimaryButton = ({ text, href, className = "", onClick }: GlobalButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bg-[#432DD7] hover:bg-blue-700 text-white font-extrabold py-3 px-8 rounded-full transition-colors duration-300 ${className}`}
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
  showArrow = false 
}: GlobalButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center font-extrabold group text-black hover:underline ${className}`}
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
      className={`inline-flex items-center justify-center font-medium text-[#FF00BF] hover:text-[#D900A6] hover:underline text-base ${className}`}
    >
      {text}
    </Link>
  );
}