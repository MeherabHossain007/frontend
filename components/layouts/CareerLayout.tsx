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
    <main className="bg-white dark:bg-gray-900">
      {sections.map((section) => {
        const content = (() => {
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
        })();
        if (section.__component === "sections.career-highlights") {
          return <div key={section.id}>{content}</div>;
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
