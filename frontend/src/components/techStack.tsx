"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { routes } from "@/routes";
import Button from "./ui/button";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TechStack() {
    const [activeSection, setActiveSection] = useState(techStack[0]);

    return (
        <>
            <div className="container-sm pt-container-sm-vert sm:pb-container-sm-vert">
                <h2 className="text-center pb-2">Tech Stack</h2>

                <div className="hidden sm:block">
                    <div className="flex">
                        {techStack.map((section) => (
                            <div
                                key={section.id}
                                onClick={() => setActiveSection(section)}
                                className={clsx(
                                    "sm:py-3 sm:px-4 md:py-5 lg:py-6 md:px-8 lg:px-16 border-t rounded-t-lg border-x transition-colors duration-200",
                                    activeSection.id === section.id
                                        ? "border-foreground/15 shadow-top bg-background"
                                        : "cursor-pointer border-transparent hover:bg-foreground/5",
                                )}
                            >
                                <p className="text-center pointer-events-none mb-0!">
                                    {section.heading}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div
                        className={clsx(
                            "grid md:grid-cols-[1.2fr_1fr]  lg:grid-cols-[.9fr_1fr] gap-16 p-8 pb-10 border border-foreground/15 shadow-md rounded-lg h-[470px]",
                            activeSection.id === techStack[0].id &&
                                "rounded-tl-none",
                        )}
                    >
                        <div className="flex-1 flex flex-col">
                            <h3>{activeSection.heading}</h3>
                            <ul className="blue-checkmark grid gap-3">
                                {activeSection.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                            <Button
                                href={routes.contact}
                                className="btn-fill-primary btn-lg w-fit mt-auto"
                            >
                                Book A Call
                            </Button>
                        </div>

                        <div className="relative hidden md:block rounded-xl overflow-hidden aspect-4/3 self-center">
                            <Image
                                src={activeSection.imgSrc}
                                alt={activeSection.heading + " Visualization"}
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="block sm:hidden pb-container-sm-vert">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    className="tech-stack flex!"
                    pagination={{
                        el: ".tech-stack__pagination",
                        clickable: true,
                    }}
                    modules={[Pagination]}
                >
                    {techStack.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="p-6 border border-foreground/15 shadow-card rounded-lg"
                        >
                            <div className="flex flex-col h-full">
                                <h3>{item.heading}</h3>
                                <ul className="blue-checkmark grid gap-1 mb-4">
                                    {item.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <Button
                                    href={routes.contact}
                                    className="btn-fill-primary btn-lg w-fit mt-auto"
                                >
                                    Book A Call
                                </Button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="tech-stack__pagination flex justify-center gap-2"></div>
            </div>
        </>
    );
}

const techStack = [
    {
        id: "devops",
        imgSrc: "/images/tech-stack__devops.jpg",
        heading: "DevOps & Cloud Architecture",
        skills: [
            "CI/CD",
            "Docker",
            "Kubernetes",
            "Azure Cloud",
            "Infrastructure as Code",
        ],
    },
    {
        id: "web",
        imgSrc: "/images/tech-stack__web-development.png",
        heading: "Web Development",
        skills: [
            "Frontend Development",
            "Backend Development",
            "A/B Testing",
            "Database Design & Administration",
            "Microservice Architecture",
        ],
    },
    {
        id: "test",
        imgSrc: "/images/tech-stack__test-automation.jpg",
        heading: "Test Automation",
        skills: [
            "Bug Reporting",
            "Quality Assurance",
            "Requirements Engineering",
            "Test Concept & Strategy",
            "UI Testautomation",
        ],
    },
];
