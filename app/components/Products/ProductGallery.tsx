// app/components/Products/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ZoomIn, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productId?: string; // Add productId to enable navigation
}

export default function ProductGallery({ images, productId }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const router = useRouter();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    // If you want to open a lightbox/modal instead of navigating, remove the router.push
    // For now, we'll just change the main image on click
  };

  const handleMainImageClick = () => {
    // If productId is provided and you want to navigate to a zoomed view or different page
    // You can modify this behavior based on your needs
    if (productId) {
      // Option 1: Navigate to a dedicated image zoom page
      // router.push(`/products/${productId}/image/${selectedImage}`);
      
      // Option 2: Open a modal (current implementation)
      setIsZoomed(true);
    } else {
      setIsZoomed(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
        onClick={handleMainImageClick}
      >
        <Image
          src={images[selectedImage]}
          alt={`Product image ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        <div className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
              selectedImage === index
                ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900"
                : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-blue-300"
            }`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full aspect-square">
              <Image
                src={images[selectedImage]}
                alt={`Zoomed product image ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Thumbnails in modal */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 overflow-hidden rounded-lg transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}