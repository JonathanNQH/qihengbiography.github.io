"use client";

import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { cn } from "@/lib/utils";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ImageGallery;