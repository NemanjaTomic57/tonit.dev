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

            <div className="bg-primary-tint ">
                <div className="container-sm py-container-sm-vert">
                    <div className="flex justify-between items-end mb-8">
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

                    <div className="grid grid-cols-4 gap-4">
                        {whyYouShouldChooseMe.map((item, index) => (
                            <div
                                key={index}
                                className="shadow-lg rounded-xl p-4 pb-6 bg-background group hover:-translate-y-3 transition-all duration-200"
                            >
                                <div className="grid place-items-center h-[75px] w-[75px] mb-6 bg-foreground/5 border-1 border-primary rounded-full group-hover:bg-primary-tint transition-all duration-200">
                                    <div className="relative h-[40px] w-[40px]">
                                        <Image
                                            src={item.icon}
                                            alt="Icon"
                                            fill
                                        />
                                    </div>
                                </div>
                                <h5>{item.heading}</h5>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-sm py-container-sm-vert">
                <h2 className="text-center">Tech Stack</h2>
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

const introText1 = (
    <>
        Hello, my name is Nemanja, and I am a software developer specializing in
        cloud infrastructure and web development. With my senior experience,
        your IT project will benefit from creative and innovative solutions to
        your unsolved problems. You don't just hire a professional developer
        with me. You also gain a true team player.
    </>
);

const introText2 = (
    <>
        Your team will greatly benefit in various ways from my services.
        Flexibility, engagement and communication are vital to success in
        today's world of business, and this is where I excel at. I speak both
        the language of technology and business, making me a key communicator
        and essential contributor in any IT project. My knowledge is broad and
        extensive. Whatever you need, I can deliver. On top of that, I'm fluent
        in German, English, Spanish and Serbian, ensuring smooth collaboration
        within international teams.
    </>
);

const whyYouShouldChooseMe = [
    {
        icon: "/images/icon__flexibility.png",
        heading: "Flexibility",
        text: (
            <>
                You have full control over contract duration, weekly hours, and
                future collaboration. Make use of my flexible pay as you go
                model and be sure that you don't overspend your budged if you
                have a variable workload. You can cancel the contract within a
                short notice at any time.
            </>
        ),
    },
    {
        icon: "/images/icon__quality.png",
        heading: "Guaranteed Quality",
        text: (
            <>
                My job is delivering high-quality work, and not only do I love
                this job. I am also very good at it. And to prove that to you, I
                have prepared a special guarantee.{" "}
                <strong>
                    If you cancel the contract within the first 100 hours, you
                    will receive a full refund.
                </strong>
            </>
        ),
    },
    {
        icon: "/images/icon__communication.png",
        heading: "Communication",
        text: (
            <>
                Strong teams are built on strong relationships. While working
                remotely does have its benefits, a team that knows and respects
                each other works better and delivers faster. Whenever you host a
                workshop or team-building event, you can count me in!
            </>
        ),
    },
    {
        icon: "/images/icon__always-there-for-you.png",
        heading: "Support at Any Time",
        text: (
            <>
                You will have the possibility to contact me at any time from the
                beginning of our relationship. Whatever you need or want to
                know, all you have to do is make one call and you will receive
                an answer in no time.
            </>
        ),
    },
];
