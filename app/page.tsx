// app/page.tsx

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@/lib/api";

// Generate metadata for the home page
export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPage("home-page");

  if (!page) {
    return {
      title: "Home",
      description: "Welcome to our website",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
  };
}

// Default function for the home page
export default async function Home() {
  // Fetch the home page data
  const [page] = await Promise.all([
    api.getPage("home-page"),
    console.log(api.getPage("home-page")),
  ]);

  console.log(page)

  // If home page is not found, return 404
  if (!page) {
    console.log(page);
    notFound();
  }

  const { sections } = page;

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
          <a href={section.buttonLink}></a>
        </div>
      ))}
    </div>
  );
}

// Enable ISR with a revalidation period
export const revalidate = 60; // Revalidate the page every 60 seconds
