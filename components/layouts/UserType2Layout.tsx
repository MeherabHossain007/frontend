import type { PageData } from "@/interfaces/page.interface";
import TextImageSection from "@/components/sections/TextImageSection";
import FeatureSpotlight from "../sections/FeatureSpotlight";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";
import FeatureSlider from "../sections/FeatureSlider";

interface UserType2LayoutProps {
  page: PageData;
}

export default function UserType2Layout({ page }: UserType2LayoutProps) {
  const { sections } = page;

  return (
    <main className="bg-white dark:bg-gray-900">
      {sections.map((section) => {
        const content = (() => {
          switch (section.__component) {
            case "sections.hero":
              return <HeroSection key={section.id} section={section} userType={page.pageType} />;
            case "sections.text-image":
              return <TextImageSection key={section.id} section={section} />;
            case "sections.feature-slider":
              return <FeatureSlider key={section.id} section={section} />;
            case "sections.feature-spotlight":
              return <FeatureSpotlight key={section.id} section={section} />;
            case "sections.testimonials":
              return <Testimonials key={section.id} section={section} />;
            default:
              return null;
          }
        })();

        if (section.__component === "sections.feature-slider") {
          return content;
        } else {
          return (
            <div key={section.id} className="max-w-5xl mx-auto">
              {content}
            </div>
          );
        }
      })}
    </main>
  );
}
