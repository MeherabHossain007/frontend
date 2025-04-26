import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPageSlugs,
  getPageDataBySlug,
  getPageMetadata,
} from "@/controllers/page/pageController";
import UserType1Layout from "@/components/layouts/UserType1Layout";
import CareerLayout from "@/components/layouts/CareerLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getPageMetadata(slug);
  return metadata;
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageDataBySlug(slug);

  if (!page) {
    notFound();
  }

  const pageType = page.pageType;

  return (
    <div>
      {pageType === "userType1" && <UserType1Layout page={page} />}
      {pageType === "userType2" && <h1>User Type 2 Page</h1>}
      {pageType === "career" && <CareerLayout page={page} />}
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds
