// app/[slug]/page.tsx

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@/lib/api";

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
  const page = await api.getPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
  };
}

// Generate static params for all pages
export async function generateStaticParams() {
  const slugs = await api.getAllPageSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Default function for the page component
export default async function Page({ params }: PageProps) {
  // Fetch the page data and global settings
  const [page] = await Promise.all([
    api.getPage(params.slug),
  ]);

  // If page is not found, return 404
  if (!page) {
    notFound();
  }

  const { sections } = page;

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

// Enable ISR with a revalidation period
export const revalidate = 60; // Revalidate the page every 60 seconds
