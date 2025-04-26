import type { PageData } from "@/interfaces/page.interface";
import CallToAction from "../sections/CallToAction";
import FeatureGrid from "../sections/FeatureGrid";
import HeroSection from "../sections/HeroSection";
import Testimonials from "../sections/Testimonial";
import TextImageSection from "../sections/TextImageSection";
import Ticker from "../sections/Ticker";
import { Section } from "@/interfaces/section.interface";

interface HomeLayoutProps {
  page: PageData;
}

export default function HomeLayout({ page }: HomeLayoutProps) {
  const { sections } = page;

  const renderSection = (section: Section) => {
    switch (section.__component) {
      case "sections.hero":
        return <HeroSection key={section.id} section={section} />;
      case "sections.text-image":
        return <TextImageSection key={section.id} section={section} />;
      case "sections.feature-grid":
        return <FeatureGrid key={section.id} section={section} />;
      case "sections.testimonials":
        return <Testimonials key={section.id} section={section} />;
      case "sections.call-to-action":
        return <CallToAction key={section.id} section={section} />;
      case "sections.ticker":
        return (
          <Ticker
            key={section.id}
            section={
              section as Extract<Section, { __component: "sections.ticker" }>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      {sections.map((section) => {
        if (section.__component === "sections.ticker") {
          return renderSection(section);
        }
        return (
          <div key={section.id} className="max-w-[1280px] mx-auto">
            {renderSection(section)}
          </div>
        );
      })}
    </main>
  );
}
