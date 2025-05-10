import type { PageData } from "@/interfaces/page.interface";
import TextImageSection from "@/components/sections/TextImageSection";
// import FeatureGrid from "@/components/sections/FeatureGrid";
import CallToAction from "@/components/sections/CallToAction";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";
import FeatureSlider from "../sections/FeatureSlider";

interface UserType1LayoutProps {
  page: PageData;
}

export default function UserType1Layout({ page }: UserType1LayoutProps) {
  const { sections } = page;

  return (
    <main className="bg-gray-50 ">
      {sections.map((section) => {
        const content = (() => {
          switch (section.__component) {
            case "sections.hero":
              return <HeroSection key={section.id} section={section} userType={page.pageType} />;
            case "sections.text-image":
              return <TextImageSection key={section.id} section={section} />;
            // case "sections.feature-grid":
            //   return <FeatureGrid key={section.id} section={section} />;
            case "sections.feature-slider":
              return <FeatureSlider key={section.id} section={section} />;
            case "sections.testimonials":
              return <Testimonials key={section.id} section={section} />;
            case "sections.call-to-action":
              return <CallToAction key={section.id} section={section} />;
            default:
              return null;
          }
        })();

        return section.__component === "sections.feature-slider" ? (
          content
        ) : (
          <div key={section.id} className="max-w-5xl mx-auto">
            {content}
          </div>
        );
      })}
    </main>
  );
}
