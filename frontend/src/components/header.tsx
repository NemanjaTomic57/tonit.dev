'use client';

import { routes } from '@/routes';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { RootContext } from './contextProviders/rootContextProvider';
import ResumePopup from './resumePopup';
import Button from './ui/button';
import Icon from './ui/icon';

export default function Header() {
    const pathname = usePathname();
    const { showResumePopup, setShowResumePopup } = useContext(RootContext);

    return (
        <>
            <ResumePopup show={showResumePopup} setShow={setShowResumePopup} />

            <header className="relative">
                <div className="absolute top-0 -z-10 h-[400px] w-full">
                    <Image src="/images/hero__overlay.png" alt="" fill />
                </div>
                <div className="container flex h-[70px] w-full items-center justify-between">
                    <Link href="https://github.com/NemanjaTomic57/tonit.dev" className="hidden sm:block" target="_blank">
                        <Icon name="github" size="xl" />
                    </Link>

                    <div className="bg-white-transparent-tint absolute top-1/2 left-1/2 flex -translate-1/2 gap-1 rounded-sm px-[5px] py-[4px]">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={clsx(
                                    'rounded-sm px-4 py-1.5 transition-colors duration-200',
                                    pathname === item.href || (pathname.includes(item.href) && item.href !== '/')
                                        ? 'bg-background font-bold'
                                        : 'hover:bg-white-transparent-tone',
                                )}
                            >
                                {item.text}
                            </Link>
                        ))}
                        <button
                            onClick={() => setShowResumePopup(true)}
                            className="hover:bg-white-transparent-tone cursor-pointer rounded-sm px-4 py-1.5 transition-colors duration-200"
                        >
                            Resume
                        </button>
                    </div>

                    <Button href={routes.contact} className="btn-fill-primary btn-base hidden sm:block">
                        Book A Call
                    </Button>
                </div>
            </header>
        </>
    );
}

const navItems = [
    {
        text: 'Home',
        href: routes.home,
    },
    {
        text: 'Blog',
        href: routes.blog,
    },
];
