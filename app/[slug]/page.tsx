// app/[slug]/page.tsx
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPageSlugs, getPageDataBySlug, getPageMetadata} from "@/controllers/page/pageController";

// Define the types for route params and generated metadata
interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const metadata = await getPageMetadata(params.slug);
  return metadata;
}

// Generate static params for all pages
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Default function for the page component
export default async function Page({ params }: PageProps) {
  // Fetch the page data using the controller
  const page = await getPageDataBySlug(params.slug);

  // If page is not found, return 404
  if (!page) {
    notFound();
  }

  const pageType = page.pageType;
//   const componentType = getSectionComponentType(pageType);

  return (
    <div>
      {/* Render the page content based on the page type */}
      {pageType === "userType1" && <h1>User Type 1 Page</h1>}
      {pageType === "userType2" && <h1>User Type 2 Page</h1>}
      {pageType === "career" && <h1>Career Page</h1>}
      {pageType === "generic" && <h1>Generic Page</h1>}
    </div>
  );
}

// Enable ISR with a revalidation period
export const revalidate = 60; // Revalidate the page every 60 seconds
