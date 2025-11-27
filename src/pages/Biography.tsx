"use client";

import React, { useState, useEffect, useRef } from "react";
import TableOfContents from "@/components/TableOfContents";
import ImageModal from "@/components/ImageModal";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils"; // Import cn for conditional class names

interface ImageItem {
  src: string;
  alt: string;
}

const biographySections = [
  { id: "personal-introduction", title: "Personal Introduction" },
  { id: "profession-skills", title: "Profession & Skills" },
  { id: "experience", title: "Experience" },
  { id: "involvement", title: "Involvement" },
  { id: "qualification", title: "Qualification" },
  { id: "self-development", title: "Self Development" },
];

const sectionImages: { [key: string]: ImageItem } = {
  "personal-introduction": { src: "https://picsum.photos/id/237/600/400", alt: "Personal Introduction" },
  "profession-skills": { src: "https://picsum.photos/id/1018/600/400", alt: "Profession & Skills" },
  "experience": { src: "https://picsum.photos/id/1040/600/400", alt: "Experience" },
  "involvement": { src: "https://picsum.photos/id/1074/600/400", alt: "Involvement" },
  "qualification": { src: "https://picsum.photos/id/1005/600/400", alt: "Qualification" },
  "self-development": { src: "https://picsum.photos/id/1006/600/400", alt: "Self Development" },
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
                {section.id === "personal-introduction" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Welcome to my personal biography. I am a passionate individual dedicated to continuous learning and making a positive impact. My journey has been shaped by diverse experiences and a relentless pursuit of knowledge.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      I believe in the power of collaboration and innovation to solve complex challenges and drive meaningful change in the world.
                    </p>
                  </>
                )}
                {section.id === "profession-skills" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      My professional background spans several dynamic fields, where I've honed a versatile skill set. I specialize in [mention a key profession/area, e.g., software development, project management, creative design] with a strong foundation in [mention 2-3 core skills, e.g., problem-solving, strategic planning, communication].
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      I am proficient in [list specific tools/technologies, e.g., React, TypeScript, Agile methodologies] and constantly seek to expand my expertise through new challenges.
                    </p>
                  </>
                )}
                {section.id === "experience" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Throughout my career, I've had the privilege of working on impactful projects and contributing to various organizations. My experience includes [mention a key role/achievement, e.g., leading a cross-functional team to launch a successful product, optimizing operational workflows, developing innovative solutions].
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Each role has provided valuable lessons in leadership, adaptability, and delivering results in fast-paced environments. I thrive on challenges that push the boundaries of what's possible.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      I am particularly proud of [mention a specific project or outcome, e.g., increasing user engagement by X%, streamlining a critical process, mentoring junior colleagues].
                    </p>
                  </>
                )}
                {section.id === "involvement" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Beyond my professional work, I am actively involved in community initiatives and volunteer efforts. I believe in giving back and contributing to causes that resonate with my values. My involvement includes [mention a type of involvement, e.g., volunteering at local charities, participating in industry mentorship programs, contributing to open-source projects].
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      These experiences have enriched my perspective and allowed me to connect with diverse groups of people, fostering a sense of shared purpose and collective growth.
                    </p>
                  </>
                )}
                {section.id === "qualification" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      My academic background and certifications provide a strong foundation for my expertise. I hold a [mention degree, e.g., Bachelor's in Computer Science, Master's in Business Administration] from [mention institution].
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      Additionally, I have obtained certifications in [list relevant certifications, e.g., Project Management Professional (PMP), AWS Certified Developer, UX/UI Design Specialist], demonstrating my commitment to continuous professional development.
                    </p>
                  </>
                )}
                {section.id === "self-development" && (
                  <>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      Self-development is a cornerstone of my personal and professional philosophy. I am constantly seeking opportunities to learn new skills, explore emerging technologies, and refine my understanding of the world. This includes [mention a self-development activity, e.g., regularly attending workshops and conferences, reading extensively on various subjects, practicing mindfulness and meditation].
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      I am a firm believer that growth is a lifelong journey, and I embrace every opportunity to evolve and improve.
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
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