"use client";

import { ResumePopupContext } from "@/components/contextProviders/resumePopupProvider";
import Button from "@/components/ui/button";
import { routes } from "@/routes";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
    const { setShowResumePopup } = useContext(ResumePopupContext);

    return (
        <>
            <div className="h-[60dvh] relative">
                <div className="absolute w-full h-full -z-10">
                    <Image
                        src="/images/hero__binary-code.png"
                        alt="Streaming binary code"
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute h-[600px] w-[800px] left-1/2 -translate-x-1/2 -z-10">
                    <Image
                        src="/images/hero__ellipses-white.png"
                        alt=""
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container grid absolute place-items-center top-2/8 left-1/2 -translate-x-1/2 text-center">
                    <h1>Making Sure</h1>
                    <h1 className="mb-2">IT Works</h1>
                    <div className="flex gap-3">
                        {heroItems.map((item, index) => (
                            <p
                                key={index}
                                className="border-1 rounded-full px-4 py-0.5"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-0 -top-[200px] -z-10">
                    <Image
                        src="/images/hero__ellipses-blue.png"
                        alt=""
                        height={800}
                        width={400}
                    />
                </div>
                <div className="flex items-center gap-16 container-sm mx-auto py-container-sm-vert">
                    <div>
                        <h2>About Me</h2>
                        <p className="mb-2">{introText1}</p>
                        <p className="mb-5">{introText2}</p>
                        <Button
                            className="btn-fill-primary btn-lg"
                            onClick={() => setShowResumePopup(true)}
                        >
                            Download Resume
                        </Button>
                    </div>
                    <Image
                        src="/images/headshot.png"
                        width={400}
                        height={500}
                        alt="Headshot of Nemanja Tomic"
                    />
                </div>
            </div>

            <div className="bg-primary-tint py-container-sm-vert">
                <div className="flex justify-between items-end container-sm">
                    <div>
                        <h2 className="mb-0!">Why You Should</h2>
                        <h2 className="mb-0!">Choose Me</h2>
                    </div>
                    <Button
                        href={routes.contact}
                        className="btn-fill-primary btn-lg mb-2"
                    >
                        Book A Call
                    </Button>
                </div>
            </div>
        </>
    );
}

const heroItems = [
    "Web Development",
    "DevOps Engineering",
    "Cloud Architecture",
    "IT Consultancy",
];

const introText1 =
    "Hello, my name is Nemanja, and I am a software developer specializing in cloud infrastructure and web development. With my senior experience, your IT project will benefit from creative and innovative solutions to your unsolved problems. You don't just hire a professional developer with me. You also gain a true team player.";
const introText2 =
    "Your team will greatly benefit in various ways from my services. Flexibility, engagement and communication are vital to success in today's world of business, and this is where I excel at. I speak both the language of technology and business, making me a key communicator and essential contributor in any IT project. My knowledge is broad and extensive. Whatever you need, I can deliver. On top of that, I'm fluent in German, English, Spanish and Serbian, ensuring smooth collaboration within international teams.";
