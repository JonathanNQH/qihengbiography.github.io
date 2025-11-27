"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import TableOfContents from "./TableOfContents";

interface Section {
  id: string;
  title: string;
}

interface MobileMenuProps {
  sections: Section[];
  activeSectionId?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, activeSectionId }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-6 pt-16">
        <TableOfContents sections={sections} activeSectionId={activeSectionId} className="w-full" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;