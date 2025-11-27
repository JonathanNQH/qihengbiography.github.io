"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSectionId?: string;
  className?: string; // Add className prop for external styling
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSectionId, className }) => {
  return (
    <nav className={cn("pr-8", className)}> {/* Removed fixed layout classes */}
      <h3 className="text-xl font-serif font-semibold mb-5 text-gray-800 dark:text-gray-200">On this page</h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors text-base font-sans",
                activeSectionId === section.id && "font-semibold text-blue-700 dark:text-blue-400"
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