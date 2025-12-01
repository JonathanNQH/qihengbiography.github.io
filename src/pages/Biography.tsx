"use client";

import React, { useState, useEffect, useRef } from "react";
import TableOfContents from "@/components/TableOfContents";
import MobileMenu from "@/components/MobileMenu";
import ProfileImage from "@/components/ProfileImage"; // Import the new ProfileImage component
import { cn } from "@/lib/utils"; // Import cn for conditional class names


const biographySections = [
  { id: "personal-introduction", title: "Personal Introduction" },
  { id: "profession-skills", title: "Profession & Skills" },
  { id: "experience", title: "Experience" },
  { id: "involvement", title: "Involvement" },
  { id: "qualification", "title": "Qualification" },
  { id: "self-development", title: "Self Development" },
];


const Biography = () => {
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});


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


  const renderBulletPoints = (items: string[]) => (
    <ul className="list-disc list-inside bg-card text-card-foreground border border-border rounded-lg p-4 space-y-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-lg leading-relaxed"
        >
          {item}
        </li>
      ))}
    </ul>
  );

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
        <h1 className="text-6xl font-serif font-bold text-center mb-12 text-foreground leading-tight">
          Biography
        </h1>

        {biographySections.map((section, index) => (
          <section key={section.id} id={section.id} className="mb-16" ref={(el) => (sectionRefs.current[section.id] = el)}>
            <h2 className="text-4xl font-serif font-semibold mb-6 text-primary">{section.title}</h2>
            <div className={cn(
              "flex flex-col items-center md:flex-row md:items-start gap-8", // Adjusted for image and text layout
              index % 2 === 1 ? "md:flex-row-reverse" : "" // Alternate image/text order
            )}>
              {section.id === "personal-introduction" && (
                <div className="md:w-1/3 flex justify-center">
                  <ProfileImage src="/placeholder.svg" alt="NG QI HENG Profile" /> {/* Placeholder image */}
                </div>
              )}
              <div className={cn("md:w-full", section.id === "personal-introduction" && "md:w-2/3")}> {/* Adjusted width for personal intro */}
                {section.id === "personal-introduction" && (
                  <>
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                      NG QI HENG <br />
                      Kulai, Johor <br />
                      <a href="tel:+60137898823" className="text-primary hover:underline">(+60)137898823</a> · <a href="mailto:ngqiheng88@gmail.com" className="text-primary hover:underline">ngqiheng88@gmail.com</a>
                    </p>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Summary</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      I am a Computer Science undergraduate with great knowledge and interest in software development, algorithms, and database systems by using Java, Python, PHP and web technologies. Obsessed in exploring AI tools, Agentic AI, Machine Learning, Deep Learning and certain new technologies.
                    </p>
                  </>
                )}
                {section.id === "profession-skills" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Technical Skills</h3>
                    {renderBulletPoints([
                      "Microsoft Office (Word, Excel, PowerPoint)",
                      "Canva",
                      "Figma",
                      "MySQL",
                      "PHP",
                      "HTML",
                      "Java",
                      "CSS",
                      "Python",
                      "JupyterLab",
                      "Matlab",
                      "ArduinoIDE",
                    ])}
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground mt-6">Languages</h3>
                    {renderBulletPoints([
                      "English: Fluent",
                      "Malay: Fluent",
                      "Mandarin: Fluent",
                      "French: Beginner",
                    ])}
                  </>
                )}
                {section.id === "experience" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Work Experience</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Café Waiter <span className="text-base font-normal text-muted-foreground float-right">2018</span></p>
                      {renderBulletPoints([
                        "Take order, casher, clean the table after used.",
                        "Understand customer needs, and customize the order based on the requirements.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Baby Car Seat Promoter <span className="text-base font-normal text-muted-foreground float-right">2019</span></p>
                      {renderBulletPoints([
                        "Promote car seat to customers based on the car model and capacity.",
                        "Understand user age, circumstances, and budget.",
                        "Suggest suitable and customize model to customer and install on their car.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Factory Production Operator (BERICAP Sdn Bhd) <span className="text-base font-normal text-muted-foreground float-right">2020</span></p>
                      {renderBulletPoints([
                        "Learn procedure to operate a production line based on the machine specification.",
                        "Solve the congestion when the machine production line is stuck.",
                        "Assemble the product and pack it into pallet to transport.",
                        "Refill the raw material when the machine is running out of materials to produce.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Dessert Shop Waiter <span className="text-base font-normal text-muted-foreground float-right">2021</span></p>
                      {renderBulletPoints([
                        "Serve the dessert to the customer according to the dessert set they purchased.",
                        "Ensure the materials always enough before the day start.",
                      ])}
                    </div>
                  </>
                )}
                {section.id === "involvement" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Curricular Activity</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Reserve Officer Training Unit (ROTU) <span className="text-base font-normal text-muted-foreground float-right">2023 - Present</span></p>
                      {renderBulletPoints([
                        "Been through three years training as an Air force reserve officer cadet.",
                        "Follow the orders strictly and execute it with full of compliance.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Malaysia Independence Day Parade in Putrajaya Square <span className="text-base font-normal text-muted-foreground float-right">31st August 2025</span></p>
                      {renderBulletPoints([
                        "Performed in the form of a parade to pay respect to national leaders and royalty.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Facilitator in TVET Camp Programme – SK Taman Bukit Maluri <span className="text-base font-normal text-muted-foreground float-right">September 2025</span></p>
                      {renderBulletPoints([
                        "Assisted in delivering STEM and TVET workshops to primary students, encourage and enlighten students to involve in the technical field and innovation.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Participant in Semarak Patriotik Programme for Higher Education Institutions (IPT) <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      {renderBulletPoints([
                        "Performed a patriotic dance in the national-level program to encourage and foster patriotism among higher education students.",
                      ])}
                    </div>
                  </>
                )}
                {section.id === "qualification" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Education</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Bachelor of Computer Science (Artificial Intelligence) with Honour <span className="text-base font-normal text-muted-foreground float-right">2023 - Present</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">National Defence University of Malaysia (NDUM), Kuala Lumpur</p>
                      {renderBulletPoints([
                        "CGPA: 3.84",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Foundation in Engineering and Technology <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">National Defence University of Malaysia (NDUM), Kuala Lumpur</p>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Sijil Pelajaran Malaysia (SPM) <span className="text-base font-normal text-muted-foreground float-right">2021</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">SMK Sultan Ibrahim, Kulai, Johor.</p>
                      {renderBulletPoints([
                        "6A, 3B, 1C",
                      ])}
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground mt-6">Certificates</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">MATLAB@UCL</p>
                      {renderBulletPoints([
                        "MATLAB Onramp",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">TOP CODERS</p>
                      {renderBulletPoints([
                        "Completion of the Top Coders Malaysia 2025 Coding Challenge Pre Competition Workshop on Python Programming Fundamentals",
                      ])}
                    </div>
                  </>
                )}
                {section.id === "self-development" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Achievements & Recognition</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">4th Place in Top Coders Coding Challenge 2024 organized by Data Science Association <span className="text-base font-normal text-muted-foreground float-right">2024</span></p>
                      {renderBulletPoints([
                        "Top five cases Solver",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Bronze Medal Innovation In Teaching and Learning Expo (INTELEX) <span className="text-base font-normal text-muted-foreground float-right">2024</span></p>
                      {renderBulletPoints([
                        "Tax Declaration System (TaxPro) on GUI Design.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Gold Medal Pre-University Matriculation Innovation Competition (PITRAM) <span className="text-base font-normal text-muted-foreground float-right">2023</span></p>
                      {renderBulletPoints([
                        "Project of topic ‘Biodegradable Plastic’.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Gold Medal Pusat Asasi Pertahanan Innovation Competition 2022 (PAPIC) <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      {renderBulletPoints([
                        "Project of topic ‘Biodegradable Plastic’.",
                      ])}
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground mt-6">Projects</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Automated External Defibrillator (AED) Usage and Maintenance Monitor System</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">JavaScript | HTML | CSS | Node.js</p>
                      {renderBulletPoints([
                        "Developed a smart and easy access system to approach the AED service in the surrounding of any circumstances.",
                        "Organize administrative on AED’s management and maintenance to ensure the condition and readiness of AED.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Database Management System – Book Ordering System</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Java | PHP | MySQL | HTML</p>
                      {renderBulletPoints([
                        "Create database connect to the frontend interface to provide user services.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Student Check IN & OUT system</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Java</p>
                      {renderBulletPoints([
                        "Developed a data entry system for student to enter their matric number and record in the system whenever they went out or in the campus.",
                      ])}
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Tax Declaration System GUI Design and Modelling</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Figma</p>
                      {renderBulletPoints([
                        "Interactive and interesting user interface design to enhance the declaration system and reduce the manual processing.",
                      ])}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Biography;