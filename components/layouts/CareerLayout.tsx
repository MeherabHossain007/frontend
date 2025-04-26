import type { PageData } from "@/interfaces/page.interface";
import CareerHero from "@/components/sections/Career/CareerHero";
import CareerVision from "@/components/sections/Career/CareerVision";
import CareerHighlights from "@/components/sections/Career/CareerHighlights";
import CareerJobListings from "@/components/sections/Career/CareerJobListings";

interface CareerLayoutProps {
  page: PageData;
}

export default function CareerLayout({ page }: CareerLayoutProps) {
  const { sections } = page;

  return (
    <main>
      {sections.map((section) => {
        switch (section.__component) {
          case "sections.career-hero":
            return <CareerHero key={section.id} section={section} />;
          case "sections.career-vision":
            return <CareerVision key={section.id} section={section} />;
          case "sections.career-highlights":
            return <CareerHighlights key={section.id} section={section} />;
          case "sections.career-job-listings":
            return <CareerJobListings key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
