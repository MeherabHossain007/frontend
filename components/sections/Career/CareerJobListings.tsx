"use client";
import { useState, useMemo, JSX } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import type { Section, JobPosition } from "@/interfaces/section.interface";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";

interface CareerJobListingsProps {
  section: Section;
}

export default function CareerJobListings({ section }: CareerJobListingsProps) {
  const [expandedCategory, setExpandedCategory] = useState("");
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [loading] = useState(false);

  // Type assertion to access specific properties
  const jobListingsSection = section as Extract<
    Section,
    { __component: "sections.career-job-listings" }
  >;
  const title = jobListingsSection.title || "Openings";

  const jobPositions = useMemo(
    () => jobListingsSection.positions || [],
    [jobListingsSection.positions]
  );

  // Group positions by department
  const positionsByDepartment = jobPositions.reduce((acc, position) => {
    const dept = position.department || "Other";
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(position);
    return acc;
  }, {} as Record<string, JobPosition[]>);

  // Extract unique departments and locations for filter dropdowns
  const departments = useMemo(
    () => [...new Set(jobPositions.map((position) => position.department))],
    [jobPositions]
  );

  const locations = useMemo(
    () => [...new Set(jobPositions.map((position) => position.location))],
    [jobPositions]
  );

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
        const matchesSearch =
          searchQuery === "" ||
          position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          position.department.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation =
          selectedLocation === "All locations" ||
          position.location === selectedLocation;

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
      id="job-listings"
      className="w-full mt-10 px-20 py-16 md:py-24 bg-white dark:bg-gray-900"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {title}
        </h2>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All categories</option>
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All locations</option>
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading job listings...
            </p>
          </div>
        )}

        {/* No results state */}
        {!loading && filteredDepartments.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No job positions match your search criteria.
            </p>
          </div>
        )}

        {/* Job categories */}
        {!loading && (
          <div className="space-y-4">
            {filteredDepartments.map((department) => {
              const positions = positionsByDepartment[department].filter(
                (position) => {
                  const matchesSearch =
                    searchQuery === "" ||
                    position.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    position.department
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());

                  const matchesLocation =
                    selectedLocation === "All locations" ||
                    position.location === selectedLocation;

                  return matchesSearch && matchesLocation;
                }
              );

              if (positions.length === 0) return null;

              return (
                <div
                  key={department}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <button
                    onClick={() => toggleCategory(department)}
                    className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {department}
                    </h3>
                    {expandedCategory === department ? (
                      <ChevronUp className="text-gray-500" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500" size={20} />
                    )}
                  </button>

                  {expandedCategory === department && positions.length > 0 && (
                    <div className="py-4 space-y-4">
                      {positions.map((position) => (
                        <div
                          key={position.id}
                          className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => togglePosition(position.id)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {position.title}
                              </h4>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {position.location}
                              </p>
                            </div>
                            {expandedPosition === position.id ? (
                              <ChevronUp className="text-gray-500" size={16} />
                            ) : (
                              <ChevronDown
                                className="text-gray-500"
                                size={16}
                              />
                            )}
                          </button>

                          {expandedPosition === position.id && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                              {position.description && (
                                <div className="mb-4">
                                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                    Description
                                  </h5>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {position.description}
                                  </p>
                                </div>
                              )}

                              {position.requirements && (
                                <div className="mb-4">
                                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                    Requirements
                                  </h5>
                                  <BlocksRenderer
                                    content={getRequirementsContent(
                                      position.requirements
                                    )}
                                    blocks={{
                                      paragraph: ({ children }) => (
                                        <p className="mb-4 text-base text-gray-700 dark:text-gray-300">
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
                                            }xl font-bold mb-4`}
                                          >
                                            {children}
                                          </Tag>
                                        );
                                      },
                                      list: ({ children, format }) => {
                                        const ListTag =
                                          format === "ordered" ? "ol" : "ul";
                                        return (
                                          <ListTag className="list-inside list-disc pl-5 mb-4">
                                            {children}
                                          </ListTag>
                                        );
                                      },
                                      "list-item": ({ children }) => (
                                        <li className="mb-2">{children}</li>
                                      ),
                                      quote: ({ children }) => (
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                                          {children}
                                        </blockquote>
                                      ),
                                      code: ({ plainText }) => (
                                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                                          <code>{plainText}</code>
                                        </pre>
                                      ),
                                      image: ({ image }) => (
                                        <Image
                                          src={image.url}
                                          width={image.width}
                                          height={image.height}
                                          alt={image.alternativeText || ""}
                                        />
                                      ),
                                      link: ({ children, url }) => (
                                        <a
                                          href={url}
                                          className="text-blue-600 hover:underline"
                                        >
                                          {children}
                                        </a>
                                      ),
                                    }}
                                    modifiers={{
                                      bold: ({ children }) => (
                                        <strong>{children}</strong>
                                      ),
                                      italic: ({ children }) => (
                                        <em>{children}</em>
                                      ),
                                      underline: ({ children }) => (
                                        <u>{children}</u>
                                      ),
                                      strikethrough: ({ children }) => (
                                        <s>{children}</s>
                                      ),
                                      code: ({ children }) => (
                                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
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
                                    className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
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
