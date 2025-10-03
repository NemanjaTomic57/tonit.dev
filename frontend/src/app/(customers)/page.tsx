import ContactForm from '@/components/contactForm';
import TechStack from '@/components/techStack';
import Button from '@/components/ui/button';
import ButtonShowResumePopup from '@/components/ui/buttonShowResumePopup';
import { apiUrl } from '@/environment';
import { routes } from '@/routes';
import axios from 'axios';
import Image from 'next/image';
import codeSnippet from '/public/images/code-snippet.png';
import headshot from '/public/images/headshot.png';
import teamMeeting from '/public/images/team-meeting.png';

export default async function Home() {
    const r = await axios.get(apiUrl + 'lead/appointment-datetimes');
    const timeOptions = r.data;

    return (
        <>
            <div className="relative mt-8 sm:mt-0 sm:h-[60dvh]">
                <div className="absolute -z-10 hidden h-full w-full sm:block">
                    <Image
                        src="/images/hero__binary-code.png"
                        alt="Streaming binary code"
                        fill
                        sizes="100vh"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute left-1/2 -z-10 hidden -translate-x-1/2 -translate-y-20 sm:block md:h-[600px] md:w-[800px]">
                    <Image src="/images/hero__ellipses-white.png" alt="" fill sizes="100vh" className="h-full w-full object-cover" />
                </div>
                <div className="top-2/8 left-1/2 container place-items-center sm:absolute sm:grid sm:-translate-x-1/2 sm:text-center">
                    <h1>Making Sure</h1>
                    <h1 className="mb-2">IT Works</h1>
                    <div className="flex flex-wrap gap-2">
                        {heroItems.map((item, index) => (
                            <p key={index} className="bg-background m-0! rounded-full border-1 px-4 py-0.5 shadow-sm">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -top-[200px] left-0 -z-10">
                    <Image src="/images/hero__ellipses-blue.png" alt="" height={800} width={400} />
                </div>
                <div className="container-sm py-container-sm-vert mx-auto grid items-center gap-6 sm:gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] lg:gap-16">
                    <div>
                        <h2>About Me</h2>
                        <p>
                            Hello, my name is Nemanja, and I am a software developer specializing in cloud infrastructure and web development. With my
                            senior experience, your IT project will benefit from creative and innovative solutions to your unsolved problems. You
                            don't just hire a professional developer with me. You also gain a true team player.
                        </p>
                        <p className="mb-5!">
                            Your team will greatly benefit in various ways from my services. Flexibility, engagement and communication are vital to
                            success in today's world of business, and this is where I excel at. I speak both the language of technology and business,
                            making me a key communicator and essential contributor in any IT project. My knowledge is broad and extensive. Whatever
                            you need, I can deliver. On top of that, I'm fluent in German, English, Spanish and Serbian, ensuring smooth collaboration
                            within international teams.
                        </p>
                        <ButtonShowResumePopup />
                    </div>
                    <div className="row-start-1 max-w-[300px] justify-self-center md:row-start-auto md:max-w-full">
                        <Image src={headshot} alt="Headshot of Nemanja Tomic" />
                    </div>
                </div>
            </div>

            <div className="bg-primary-tint">
                <div className="container-sm py-container-sm-vert">
                    <div className="mb-8 hidden items-end justify-between sm:flex">
                        <div>
                            <h2 className="mb-0!">Why You Should</h2>
                            <h2 className="mb-0!">Choose Me</h2>
                        </div>
                        <Button href={routes.contact} className="btn-fill-primary btn-lg mb-2">
                            Book A Call
                        </Button>
                    </div>

                    <h2 className="sm:hidden">Why You Should Choose Me</h2>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {whyYouShouldChooseMe.map((item, index) => (
                            <div
                                key={index}
                                className="bg-background group rounded-lg p-4 pb-6 shadow-lg transition-all duration-200 sm:hover:-translate-y-1.5 lg:hover:-translate-y-3"
                            >
                                <div className="bg-foreground/5 border-primary group-hover:bg-primary-tint mb-3 grid h-[75px] w-[75px] place-items-center rounded-full border-1 transition-all duration-200 sm:mb-6">
                                    <Image src={item.icon} alt="Icon" width={40} height={40} />
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
                <div className="container-sm py-container-sm-vert grid items-center gap-8 md:grid-cols-2">
                    <Image src={teamMeeting} alt="Team working on a project" className="justify-self-center" />

                    <div>
                        <h2>My Risk-Free Promise</h2>
                        <p>
                            I am confident in my abilities to help your project succeed. To prove that, I offer a guarantee to every one of my
                            clients.
                        </p>
                        <p>
                            If you’re not fully satisfied after the first 100 hours, you can cancel the contract and receive a{' '}
                            <strong>full refund</strong>. You have complete freedom to decide whether or not you’d like to continue working together
                            after that trial period — no hard feelings, no strings attached.
                        </p>
                        <p className="text-primary mb-0! font-bold">Together, We Can Do It!</p>
                    </div>
                </div>
            </div>

            <div className="container-sm py-container-sm-vert grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
                <div>
                    <h2 className="pb-2">Experience And Education</h2>
                    <ul className="blue-checkmark">
                        {experienceItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <ButtonShowResumePopup className="mt-8" />
                </div>

                <Image src={codeSnippet} alt="Team working on a project" className="hidden lg:block" />
            </div>

            <ContactForm />
        </>
    );
}

const heroItems = ['Web Development', 'DevOps Engineering', 'Cloud Architecture', 'IT Consultancy'];

const whyYouShouldChooseMe = [
    {
        icon: '/images/icon__flexibility.png',
        heading: 'Flexibility',
        text: (
            <>
                You have full control over contract duration, weekly hours, and future collaboration. You can cancel the contract within a short
                notice at any time.
            </>
        ),
    },
    {
        icon: '/images/icon__quality.png',
        heading: 'Guaranteed Quality',
        text: (
            <>
                My job is delivering high-quality work, and not only do I love this job. I am also very good at it. And to prove that to you, I have
                prepared a special guarantee. If you cancel the contract within the first 100 hours of work,
                <strong> you will receive a full refund.</strong>
            </>
        ),
    },
    {
        icon: '/images/icon__communication.png',
        heading: 'Communication',
        text: (
            <>
                Strong teams are built on strong relationships. While working remotely does have its benefits, a team that knows and respects each
                other works better and delivers faster. Whenever you host a workshop or team-building event, you can count me in!
            </>
        ),
    },
    {
        icon: '/images/icon__always-there-for-you.png',
        heading: 'Support at Any Time',
        text: (
            <>
                You will have the possibility to contact me at any time from the beginning of our relationship. Whatever you need, all you have to do
                is make one call and you will receive an answer in no time.
            </>
        ),
    },
];

const experienceItems = [
    <>4+ years of hands-on experience in large-scale projects</>,
    <>
        Certified Kubernetes Administrator (CKA) — <strong>Linux Foundation</strong>
    </>,
    <>
        Certified Calico Operator: Level 1 — <strong>Tigera</strong>
    </>,
    <>
        ISTQB Certified Tester Foundation Level (CTFL) — <strong>German Testing Board</strong>
    </>,
    <>
        Certified Data Scientist — <strong>DBE Academy</strong>
    </>,
    <>
        B.Sc. Business and Computer Science — <strong>DHBW Stuttgart</strong>
    </>,
];
