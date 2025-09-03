"use client";

import { ResumePopupContext } from "@/components/contextProviders/resumePopupProvider";
import Button from "@/components/ui/button";
import { routes } from "@/routes";
import Image from "next/image";
import { useContext } from "react";
import headshot from "/public/images/headshot.png";
import teamMeeting from "/public/images/team-meeting.png";
import codeSnippet from "/public/images/code-snippet.png";
import TechStack from "@/components/techStack";
import ContactForm from "@/components/contactForm";
import Footer from "@/components/footer";

export default function Home() {
    const { setShowResumePopup } = useContext(ResumePopupContext);

    return (
        <>
            <div className="mt-8 sm:mt-0 sm:h-[60dvh] relative">
                <div className="absolute w-full h-full -z-10 hidden sm:block">
                    <Image
                        src="/images/hero__binary-code.png"
                        alt="Streaming binary code"
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute md:h-[600px] md:w-[800px] left-1/2 -translate-x-1/2 -z-10 hidden sm:block">
                    <Image
                        src="/images/hero__ellipses-white.png"
                        alt=""
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container sm:grid sm:absolute place-items-center top-2/8 left-1/2 sm:-translate-x-1/2 sm:text-center">
                    <h1>Making Sure</h1>
                    <h1 className="mb-2">IT Works</h1>
                    <div className="flex gap-2 flex-wrap">
                        {heroItems.map((item, index) => (
                            <p
                                key={index}
                                className="border-1 rounded-full px-4 py-0.5 m-0! bg-background shadow-sm"
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
                <div className="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] items-center gap-6 sm:gap-8 lg:gap-16 container-sm mx-auto py-container-sm-vert">
                    <div>
                        <h2>About Me</h2>
                        <p>
                            Hello, my name is Nemanja, and I am a software
                            developer specializing in cloud infrastructure and
                            web development. With my senior experience, your IT
                            project will benefit from creative and innovative
                            solutions to your unsolved problems. You don't just
                            hire a professional developer with me. You also gain
                            a true team player.
                        </p>
                        <p className="mb-5!">
                            Your team will greatly benefit in various ways from
                            my services. Flexibility, engagement and
                            communication are vital to success in today's world
                            of business, and this is where I excel at. I speak
                            both the language of technology and business, making
                            me a key communicator and essential contributor in
                            any IT project. My knowledge is broad and extensive.
                            Whatever you need, I can deliver. On top of that,
                            I'm fluent in German, English, Spanish and Serbian,
                            ensuring smooth collaboration within international
                            teams.
                        </p>
                        <Button
                            className="btn-fill-primary btn-lg"
                            onClick={() => setShowResumePopup(true)}
                        >
                            Download Resume
                        </Button>
                    </div>
                    <div className="row-start-1 md:row-start-auto max-w-[300px] md:max-w-full justify-self-center">
                        <Image src={headshot} alt="Headshot of Nemanja Tomic" />
                    </div>
                </div>
            </div>

            <div className="bg-primary-tint ">
                <div className="container-sm py-container-sm-vert">
                    <div className="justify-between items-end mb-8 hidden sm:flex">
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

                    <h2 className="sm:hidden">Why You Should Choose Me</h2>

                    <div className="grid sm:grid-cols-2 gap-3 lg:grid-cols-4">
                        {whyYouShouldChooseMe.map((item, index) => (
                            <div
                                key={index}
                                className="shadow-lg rounded-lg p-4 pb-6 bg-background group sm:hover:-translate-y-1.5 lg:hover:-translate-y-3 transition-all duration-200"
                            >
                                <div className="grid place-items-center h-[75px] w-[75px] mb-3 sm:mb-6 bg-foreground/5 border-1 border-primary rounded-full group-hover:bg-primary-tint transition-all duration-200">
                                    <Image
                                        src={item.icon}
                                        alt="Icon"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <h5>{item.heading}</h5>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TechStack />

            <div className="bg-primary-tint">
                <div className="container-sm py-container-sm-vert grid md:grid-cols-2 items-center gap-8">
                    <Image
                        src={teamMeeting}
                        alt="Team working on a project"
                        className="justify-self-center"
                    />

                    <div>
                        <h2>My Risk-Free Promise</h2>
                        <p>
                            I am confident in my abilities to help your project
                            succeed. To prove that, I offer a guarantee to every
                            one of my clients.
                        </p>
                        <p>
                            If you’re not fully satisfied after the first 100
                            hours, you can cancel the contract and receive a{" "}
                            <strong>full refund</strong>. You have complete
                            freedom to decide whether or not you’d like to
                            continue working with us after that trial period —
                            no hard feelings, no strings attached. Together, we
                            can do it!
                        </p>
                        <p className="font-bold text-primary mb-0!">
                            Together, We Can Do It!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-sm py-container-sm-vert grid lg:grid-cols-[1.2fr_1fr] items-center gap-16">
                <div>
                    <h2 className="pb-2">Experience And Education</h2>
                    <ul className="blue-checkmark">
                        {experienceItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <Button
                        className="btn-fill-primary btn-lg mt-8"
                        onClick={() => setShowResumePopup(true)}
                    >
                        Download Resume
                    </Button>
                </div>

                <Image
                    src={codeSnippet}
                    alt="Team working on a project"
                    className="hidden lg:block"
                />
            </div>

            <ContactForm />

            <Footer />
        </>
    );
}

const heroItems = [
    "Web Development",
    "DevOps Engineering",
    "Cloud Architecture",
    "IT Consultancy",
];

const whyYouShouldChooseMe = [
    {
        icon: "/images/icon__flexibility.png",
        heading: "Flexibility",
        text: (
            <>
                You have full control over contract duration, weekly hours, and
                future collaboration. You can cancel the contract within a short
                notice at any time.
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
                have prepared a special guarantee. If you cancel the contract
                within the first 100 hours of work,
                <strong> you will receive a full refund.</strong>
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
                beginning of our relationship. Whatever you need, all you have
                to do is make one call and you will receive an answer in no
                time.
            </>
        ),
    },
];

const experienceItems = [
    <>4+ years of hands-on experience in large-scale projects</>,
    <>
        DevOps Engineer Expert — <strong>Microsoft</strong>
    </>,
    <>
        Certified Kubernetes Administrator (CKA) —{" "}
        <strong>Linux Foundation</strong>
    </>,
    <>
        Certified Calico Operator: Level 1 — <strong>Tigera</strong>
    </>,
    <>
        ISTQB Certified Tester Foundation Level (CTFL) —{" "}
        <strong>German Testing Board</strong>
    </>,
    <>
        Certified Data Scientist — <strong>DBE Academy</strong>
    </>,
    <>
        B.Sc. Business and Computer Science — <strong>DHBW Stuttgart</strong>
    </>,
];
