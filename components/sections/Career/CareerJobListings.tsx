"use client";
import { useState, useMemo, JSX } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import type { JobPosition, Section } from "@/interfaces/section.interface";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";

interface CareerJobListingsProps {
  section: Extract<Section, { __component: "sections.career-job-listings" }>;
}

export default function CareerJobListings({ section }: CareerJobListingsProps) {
  const [expandedCategory, setExpandedCategory] = useState("");
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [loading] = useState(false);

  const title = section.title || "Openings";

  const jobPositions = useMemo(
    () => section.positions || [],
    [section.positions]
  );

  // Group positions by department
  const positionsByDepartment = jobPositions.reduce((acc, position) => {
    // Ensure department exists, use "Other" as default
    const dept = position.department || "Other";
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(position);
    return acc;
  }, {} as Record<string, JobPosition[]>);

  // Extract unique departments and locations for filter dropdowns
  const departments = useMemo(
    () => [
      ...new Set(
        jobPositions.map((position) => position.department || "Other")
      ),
    ],
    [jobPositions]
  );

  const locations = useMemo(
    () => [
      ...new Set(jobPositions.map((position) => position.location || "Remote")),
    ],
    [jobPositions]
  );

  // Helper function to create a consistent key for location strings
  const createLocationKey = (location: string): string => {
    // Create a slug-like key from the location string
    return `loc-${location
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`;
  };

  // Helper function to get requirements as BlocksContent
  const getRequirementsContent = (requirements: unknown): BlocksContent => {
    return Array.isArray(requirements) ? requirements : [];
  };

  // Filter positions based on search query and filters
  const filteredDepartments = Object.keys(positionsByDepartment).filter(
    (dept) => {
      if (selectedCategory !== "All categories" && dept !== selectedCategory) {
        return false;
      }

      const positions = positionsByDepartment[dept];
      return positions.some((position) => {
        const positionTitle = position.title || "";
        const positionDepartment = position.department || "Other";
        const positionLocation = position.location || "Remote";

        const matchesSearch =
          searchQuery === "" ||
          positionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          positionDepartment.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation =
          selectedLocation === "All locations" ||
          positionLocation === selectedLocation;

        return matchesSearch && matchesLocation;
      });
    }
  );

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory("");
      setExpandedPosition(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const togglePosition = (positionId: number) => {
    if (expandedPosition === positionId) {
      setExpandedPosition(null);
    } else {
      setExpandedPosition(positionId);
    }
  };

  return (
    <section
      id="openings"
      className="w-full py-16 bg-white dark:bg-zinc-900 transition-colors duration-200"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header with search icon */}
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-white transition-colors duration-200">
            {title}
          </h2>
          <div className="ml-auto">
            <Search className="text-[#FF00BF] dark:text-[#FF66D9]" size={24} />
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF00BF] dark:focus:ring-[#FF66D9] transition-colors duration-200"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF00BF] dark:focus:ring-[#FF66D9] transition-colors duration-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All categories</option>
                {departments.map((department) => (
                  <option
                    key={department || "other"}
                    className="bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    {department || "Other"}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF00BF] dark:focus:ring-[#FF66D9] transition-colors duration-200"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All locations</option>
                {locations.map((location) => (
                  <option
                    key={createLocationKey(location)}
                    className="bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF00BF] dark:border-[#FF66D9] border-r-transparent"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Loading job listings...
            </p>
          </div>
        )}

        {/* No results state */}
        {!loading && filteredDepartments.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
              No job positions match your search criteria.
            </p>
          </div>
        )}

        {/* Job categories */}
        {!loading && (
          <div className="space-y-0">
            {filteredDepartments.map((department) => {
              const positions = positionsByDepartment[department].filter(
                (position) => {
                  const positionTitle = position.title || "";
                  const positionDepartment = position.department || "Other";
                  const positionLocation = position.location;

                  const matchesSearch =
                    searchQuery === "" ||
                    positionTitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    positionDepartment
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());

                  const matchesLocation =
                    selectedLocation === "All locations" ||
                    positionLocation === selectedLocation;

                  return matchesSearch && matchesLocation;
                }
              );

              if (positions.length === 0) return null;

              return (
                <div
                  key={department}
                  className="border-b-4 border-black dark:border-gray-600"
                >
                  <button
                    onClick={() => toggleCategory(department)}
                    className="w-full flex justify-between items-center py-5 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <h3 className="text-2xl font-bold text-black dark:text-white transition-colors duration-200">
                      {department}
                    </h3>
                    {expandedCategory === department ? (
                      <ChevronUp
                        className="text-gray-700 dark:text-gray-300"
                        size={20}
                      />
                    ) : (
                      <ChevronDown
                        className="text-gray-700 dark:text-gray-300"
                        size={20}
                      />
                    )}
                  </button>

                  {expandedCategory === department && positions.length > 0 && (
                    <div className="py-2 space-y-2 mb-4">
                      {positions.map((position) => (
                        <div
                          key={position.id}
                          className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                          <button
                            onClick={() => togglePosition(position.id)}
                            className="w-full flex justify-between items-center p-3 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                          >
                            <div>
                              <h4 className="font-medium text-black dark:text-white transition-colors duration-200">
                                {position.title || "Untitled Position"}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-200">
                                {position.location}
                              </p>
                            </div>
                            {expandedPosition === position.id ? (
                              <ChevronUp
                                className="text-gray-700 dark:text-gray-300"
                                size={16}
                              />
                            ) : (
                              <ChevronDown
                                className="text-gray-700 dark:text-gray-300"
                                size={16}
                              />
                            )}
                          </button>

                          {expandedPosition === position.id && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                              {position.description && (
                                <div className="mb-4">
                                  <h5 className="font-medium text-black dark:text-white mb-2 transition-colors duration-200">
                                    Description
                                  </h5>
                                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                    {position.description}
                                  </p>
                                </div>
                              )}

                              {position.requirements && (
                                <div className="mb-4">
                                  <h5 className="font-medium text-black dark:text-white mb-2 transition-colors duration-200">
                                    Requirements
                                  </h5>
                                  <BlocksRenderer
                                    content={getRequirementsContent(
                                      position.requirements
                                    )}
                                    blocks={{
                                      paragraph: ({ children }) => (
                                        <p className="mb-4 text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                          {children}
                                        </p>
                                      ),
                                      heading: ({ children, level }) => {
                                        const Tag =
                                          `h${level}` as keyof JSX.IntrinsicElements;
                                        return (
                                          <Tag
                                            className={`text-${
                                              level * 2
                                            }xl font-bold mb-4 text-black dark:text-white transition-colors duration-200`}
                                          >
                                            {children}
                                          </Tag>
                                        );
                                      },
                                      list: ({ children, format }) => {
                                        const ListTag =
                                          format === "ordered" ? "ol" : "ul";
                                        return (
                                          <ListTag className="list-inside list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                            {children}
                                          </ListTag>
                                        );
                                      },
                                      "list-item": ({ children }) => (
                                        <li className="mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                          {children}
                                        </li>
                                      ),
                                      quote: ({ children }) => (
                                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">
                                          {children}
                                        </blockquote>
                                      ),
                                      code: ({ plainText }) => (
                                        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4 overflow-x-auto text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                          <code>{plainText}</code>
                                        </pre>
                                      ),
                                      image: ({ image }) => (
                                        <Image
                                          src={image.url}
                                          width={image.width || 800}
                                          height={image.height || 600}
                                          alt={image.alternativeText || ""}
                                          className="rounded-lg"
                                        />
                                      ),
                                      link: ({ children, url }) => (
                                        <a
                                          href={url}
                                          className="text-[#FF00BF] dark:text-[#FF66D9] hover:underline transition-colors duration-200"
                                        >
                                          {children}
                                        </a>
                                      ),
                                    }}
                                    modifiers={{
                                      bold: ({ children }) => (
                                        <strong className="text-black dark:text-white">
                                          {children}
                                        </strong>
                                      ),
                                      italic: ({ children }) => (
                                        <em className="text-gray-700 dark:text-gray-300">
                                          {children}
                                        </em>
                                      ),
                                      underline: ({ children }) => (
                                        <u className="text-gray-700 dark:text-gray-300">
                                          {children}
                                        </u>
                                      ),
                                      strikethrough: ({ children }) => (
                                        <s className="text-gray-700 dark:text-gray-300">
                                          {children}
                                        </s>
                                      ),
                                      code: ({ children }) => (
                                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                          {children}
                                        </code>
                                      ),
                                    }}
                                  />
                                </div>
                              )}

                              {position.applicationUrl && (
                                <div className="mt-4">
                                  <a
                                    href={position.applicationUrl}
                                    className="inline-flex items-center justify-center px-6 py-2 bg-[#FF00BF] hover:bg-[#D900A6] dark:bg-[#FF66D9] dark:hover:bg-[#FF00BF] text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105"
                                  >
                                    Apply Now
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}