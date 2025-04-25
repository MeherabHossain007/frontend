interface StrapiImageFormats {
  thumbnail?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
}

export interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
}

interface HeroSection {
  __component: "sections.hero";
  id: number;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  image: StrapiImage | null;
}

interface TextImageSection {
  __component: "sections.text-image";
  id: number;
  title: string;
  subtitle: string;
  richText?: unknown;
  features?: FeatureItem[];
  button?: {
    buttonText: string;
    buttonLink: string;
  }[];
  image: StrapiImage | null;
  reversed?: boolean;
}


interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage | null;
}

interface FeatureGridSection {
  __component: "sections.feature-grid";
  id: number;
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  avatar: StrapiImage | null;
}

interface TestimonialsSection {
  __component: "sections.testimonials";
  id: number;
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

interface CallToActionSection {
  __component: "sections.call-to-action";
  id: number;
  title: string;
  subtitle: string;
  image: StrapiImage | null;
  features?: FeatureItem[];
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

interface TickerItem {
  id: number;
  name: string;
  logo: StrapiImage | null;
}

interface TickerSection {
  __component: "sections.ticker";
  id: number;
  items: TickerItem[];
  speed?: number;
  direction?: "forward" | "reverse";
}

// Union type for all section types
export type Section =
  | HeroSection
  | FeatureGridSection
  | TestimonialsSection
  | CallToActionSection
  | TickerSection
  | TextImageSection;
