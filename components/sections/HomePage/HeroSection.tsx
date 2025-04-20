import { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  section: Section;
}

export default function HeroSection({ section }: HeroSectionProps) {
  return (
    <section className="w-full px-4 py-10 md:py-20 ">
      <div className="max-w-[1600px] mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Left - Image */}
        <div className="w-full md:w-1/2 relative aspect-video md:aspect-[4/3]">
          <Image
            src="/assets/cat.jpg"
            alt="Hero Image"
            fill
            className="object-cover rounded-xl shadow-md"
            priority
          />
        </div>

        {/* Right - Text & Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {section.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            {section.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              href="#"
              className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-8 py-4 rounded-xl transition-colors duration-300 font-medium text-lg"
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="bg-red-100 hover:bg-red-200 text-red-800 px-8 py-4 rounded-xl transition-colors duration-300 font-medium text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
