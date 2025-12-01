"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ExperienceImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ExperienceImage: React.FC<ExperienceImageProps> = ({ src, alt, className }) => {
  return (
    <div className={cn("relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden shadow-sm border border-border", className)}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default ExperienceImage;