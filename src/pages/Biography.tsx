"use client";

import React, { useState, useEffect, useRef } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import TableOfContents from "@/components/TableOfContents";
import ImageModal from "@/components/ImageModal";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils"; // Import cn for conditional class names

interface ImageItem {
  src: string;
  alt: string;
}

const biographySections = [
  { id: "early-life", title: "Early Life and Childhood" },
  { id: "formative-years", title: "Formative Years and Education" },
  { id: "career-achievements", title: "Career and Major Achievements" },
  { id: "later-life-legacy", title: "Later Life and Legacy" },
];

const sectionImages: { [key: string]: ImageItem } = {
  "early-life": { src: "https://picsum.photos/id/237/600/400", alt: "Childhood Home" },
  "formative-years": { src: "https://picsum.photos/id/1018/600/400", alt: "University Campus" },
  "career-achievements": { src: "https://picsum.photos/id/1040/600/400", alt: "Award Ceremony" },
  "later-life-legacy": { src: "https://picsum.photos/id/1074/600/400", alt: "Reflective Study" },
};

const Biography = () => {
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});
  const [visibleImages, setVisibleImages] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    biographySections.forEach(section => {
      initialState[section.id] = false;
    });
    return initialState;
  });

  const [selectedImageForModal, setSelectedImageForModal] = useState<ImageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImageForModal(image);
    setIsModalOpen(true);
  };

  // Effect for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is roughly in the middle of the viewport
        threshold: 0,
      }
    );

    biographySections.forEach((section) => {
      const ref = sectionRefs.current[section.id];
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      biographySections.forEach((section) => {
        const ref = sectionRefs.current[section.id];
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  // Effect for image visibility on scroll
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleImages((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      {
        threshold: 0.3, // Image becomes visible when 30% of it is in view
        rootMargin: "0px 0px -100px 0px", // Adjust as needed for when it should appear
      }
    );

    biographySections.forEach((section) => {
      const ref = imageRefs.current[section.id];
      if (ref) {
        imageObserver.observe(ref);
      }
    });

    return () => {
      biographySections.forEach((section) => {
        const ref = imageRefs.current[section.id];
        if (ref) {
          imageObserver.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 font-sans">
      {/* Mobile Menu for small screens */}
      <MobileMenu sections={biographySections} activeSectionId={activeSectionId} />

      {/* Table of Contents for larger screens */}
      <div className="hidden lg:block sticky top-4 w-64 pr-8 pt-20">
        <TableOfContents sections={biographySections} activeSectionId={activeSectionId} />
      </div>

      {/* Main Biography Content */}
      <div className="lg:col-span-1">
        <h1 className="text-6xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-gray-100 leading-tight">
          The Life of a Remarkable Individual
        </h1>

        {biographySections.map((section, index) => (
          <section key={section.id} id={section.id} className="mb-16" ref={(el) => (sectionRefs.current[section.id] = el)}>
            <h2 className="text-4xl font-serif font-semibold mb-6 text-gray-800 dark:text-gray-200">{section.title}</h2>
            <div className={cn(
              "flex flex-col md:flex-row items-start gap-8",
              index % 2 === 1 ? "md:flex-row-reverse" : "" // Alternate image/text order
            )}>
              {sectionImages[section.id] && (
                <div className="md:w-1/2 flex-shrink-0">
                  <img
                    id={section.id} // Add ID for image observer
                    ref={(el) => (imageRefs.current[section.id] = el)}
                    src={sectionImages[section.id].src}
                    alt={sectionImages[section.id].alt}
                    className={cn(
                      "w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transition-opacity duration-700 ease-in-out",
                      visibleImages[section.id] ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => handleImageClick(sectionImages[section.id])}
                  />
                </div>
              )}
              <div className="md:w-1/2">
                {/* Placeholder text - replace with actual content for each section */}
                {section.id === "early-life" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Born in a small, vibrant village nestled in the heart of rolling hills, our subject's early years were marked by curiosity and an insatiable thirst for knowledge. From a young age, they displayed an extraordinary aptitude for observation, often spending hours exploring the natural world around them, meticulously documenting their findings in a worn leather-bound journal. Their family, though modest, fostered an environment of intellectual freedom and encouraged their burgeoning talents.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      School was not merely a place of learning but a playground for their mind. They excelled in every subject, particularly in sciences and arts, often challenging conventional wisdom and proposing innovative solutions to complex problems. This early period laid the foundation for a life dedicated to discovery and creative expression.
                    </p>
                  </>
                )}
                {section.id === "formative-years" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      As they transitioned into adolescence, their intellectual pursuits deepened. They left their village to attend a prestigious academy, where they specialized in theoretical physics and classical literature. It was during these years that they developed their unique interdisciplinary approach, believing that true understanding emerged from the synthesis of diverse fields. Their professors often spoke of their unparalleled ability to connect seemingly disparate concepts, weaving them into a coherent and compelling narrative.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      Beyond academics, they were also deeply involved in community service, organizing initiatives to promote literacy and environmental conservation. These experiences instilled in them a profound sense of social responsibility, shaping their future endeavors.
                    </p>
                  </>
                )}
                {section.id === "career-achievements" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Upon completing their education, they embarked on a career that would redefine their field. Their groundbreaking research in quantum mechanics led to several paradigm shifts, earning them international acclaim and numerous accolades, including the coveted Nobel Prize. Yet, they remained humble, always attributing their success to collaborative efforts and the support of their peers.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Not content with purely scientific pursuits, they also dedicated a significant portion of their life to humanitarian causes. They founded several non-profit organizations focused on global health and education, impacting millions of lives across continents. Their ability to inspire and mobilize others was legendary, turning ambitious visions into tangible realities.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      Their work was characterized by an unwavering commitment to ethical principles and a deep empathy for the human condition. They believed that true progress was measured not just by scientific advancement but by the betterment of society as a whole.
                    </p>
                  </>
                )}
                {section.id === "later-life-legacy" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      In their later years, they retreated from the public eye, choosing to spend their time mentoring young scholars and writing philosophical treatises. Their memoirs, published posthumously, offered profound insights into their journey, their struggles, and their ultimate triumphs. They passed away peacefully, leaving behind a legacy that continues to inspire generations.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      Their life serves as a testament to the power of intellect, compassion, and perseverance. They taught us that the pursuit of knowledge and the service of humanity are not mutually exclusive but are, in fact, deeply intertwined. Their impact on the world is immeasurable, a beacon of hope and inspiration for all who strive to make a difference.
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
        <MadeWithDyad />
      </div>

      {selectedImageForModal && (
        <ImageModal
          src={selectedImageForModal.src}
          alt={selectedImageForModal.alt}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Biography;