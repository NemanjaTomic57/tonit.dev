'use client';

import { routes } from '@/routes';
import Image from 'next/image';
import Link from 'next/link';
import BlogSubscription from './blogSubscription';
import Icon from './ui/icon';
import toTopButton from '/public/images/footer__to-top-button.png';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <BlogSubscription />

            <div className="relative container flex h-[80px] items-center justify-between">
                <Link href="https://github.com/NemanjaTomic57/tonit.dev" className="hidden sm:block" target="_blank">
                    <Icon name="github" size="xl" />
                </Link>

                <div className="absolute left-1/2 flex -translate-x-1/2 gap-6 text-sm sm:gap-12">
                    <Link href={routes.home} className="hover:underline">
                        Home
                    </Link>
                    <Link href={routes.blog} className="hover:underline">
                        Blog
                    </Link>
                    <Link href={routes.contact} className="hover:underline">
                        Contact
                    </Link>
                </div>

                <Image
                    src={toTopButton}
                    alt="Navigate to top"
                    width={60}
                    height={60}
                    className="pointer-events-auto! hidden cursor-pointer rounded-full select-auto sm:block"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
            </div>

            <div className="container">
                <div className="w-full border-b-1"></div>
            </div>

            <div className="container my-8 flex justify-center gap-4 text-sm">
                <div>© {currentYear} Nemanja Tomic. All rights reserved.</div>
            </div>
        </>
    );
}
