"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img
        src="/NQH.png"
        alt="NQH Logo"
        className="h-16 w-auto sm:h-20" // Responsive height
      />
    </div>
  );
};

export default Logo;