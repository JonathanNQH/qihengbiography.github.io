"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] p-0 border-none bg-transparent shadow-none">
        <img src={src} alt={alt} className="max-h-[90vh] w-full object-contain rounded-lg" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;