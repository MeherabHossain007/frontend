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

// Union type for all section types
export type Section = HeroSection;
