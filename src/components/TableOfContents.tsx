"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSectionId?: string; // New prop to indicate the active section
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSectionId }) => {
  return (
    <nav className="sticky top-4 hidden lg:block w-64 pr-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">On this page</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base",
                activeSectionId === section.id && "font-bold text-blue-600 dark:text-blue-400" // Apply active style
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;