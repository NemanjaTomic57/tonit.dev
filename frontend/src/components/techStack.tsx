'use client';

import { routes } from '@/routes';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from './ui/button';

export default function TechStack() {
    const [activeSection, setActiveSection] = useState(techStack[0]);

    return (
        <>
            <div className="container-sm pt-container-sm-vert sm:pb-container-sm-vert relative w-full">
                <h2 className="pb-2 text-center">Tech Stack</h2>

                <div className="hidden sm:block">
                    <div className="flex">
                        {techStack.map((section) => (
                            <div
                                key={section.id}
                                onClick={() => setActiveSection(section)}
                                className={clsx(
                                    'rounded-t-lg border-x border-t transition-colors duration-200 sm:px-4 sm:py-3 md:px-8 md:py-5 lg:px-16 lg:py-6',
                                    activeSection.id === section.id
                                        ? 'border-foreground/15 shadow-top bg-background'
                                        : 'hover:bg-foreground/5 cursor-pointer border-transparent',
                                )}
                            >
                                <p className="pointer-events-none mb-0! text-center">{section.heading}</p>
                            </div>
                        ))}
                    </div>

                    <div
                        className={clsx(
                            'border-foreground/15 grid h-[486px] gap-16 rounded-lg border p-8 pb-10 shadow-md md:grid-cols-[1.2fr_1fr] lg:grid-cols-[.9fr_1fr]',
                            activeSection.id === techStack[0].id && 'rounded-tl-none',
                        )}
                    >
                        <div className="flex flex-1 flex-col">
                            <h3>{activeSection.heading}</h3>
                            <ul className="blue-checkmark mb-4 grid gap-3">
                                {activeSection.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                            <Button href={routes.contact} className="btn-fill-primary btn-lg mt-auto w-fit">
                                Contact
                            </Button>
                        </div>

                        <div className="relative hidden aspect-4/3 self-center overflow-hidden rounded-xl md:block">
                            <Image src={activeSection.imgSrc} alt={activeSection.heading + ' Visualization'} fill />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-container-sm-vert block sm:hidden">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    className="tech-stack flex!"
                    pagination={{
                        el: '.tech-stack__pagination',
                        clickable: true,
                    }}
                    modules={[Pagination]}
                >
                    {techStack.map((item) => (
                        <SwiperSlide key={item.id} className="border-foreground/15 shadow-card rounded-lg border p-6">
                            <div className="flex h-full flex-col">
                                <h3>{item.heading}</h3>
                                <ul className="blue-checkmark mb-4 grid gap-1">
                                    {item.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <Button href={routes.contact} className="btn-fill-primary btn-lg mt-auto w-fit">
                                    Contact
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
        id: 'devops',
        imgSrc: '/images/tech-stack__devops.jpg',
        heading: 'DevOps & Cloud Architecture',
        skills: ['CI/CD', 'Docker', 'Kubernetes', 'Azure Cloud', 'Infrastructure as Code'],
    },
    {
        id: 'web',
        imgSrc: '/images/tech-stack__web-development.png',
        heading: 'Web Development',
        skills: ['Frontend Development', 'Backend Development', 'A/B Testing', 'Database Design & Administration', 'Microservice Architecture'],
    },
    {
        id: 'test',
        imgSrc: '/images/tech-stack__test-automation.jpg',
        heading: 'Test Automation',
        skills: ['Bug Reporting', 'Quality Assurance', 'Requirements Engineering', 'Test Concept & Strategy', 'UI Testautomation'],
    },
];
