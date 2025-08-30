"use client";

import { routes } from "@/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/button";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full">
            <div className="relative">
                <div className="w-full -z-10 absolute top-0">
                    <img
                        src="/images/hero__overlay.png"
                        alt="Hero overlay"
                        className="w-full"
                    />
                </div>
                <div className="container flex h-[70px] w-full justify-end items-center">
                    <div className="absolute gap-3 left-1/2 top-1/2 -translate-1/2 flex bg-white-transparent-tint rounded-full py-[4px] px-[5px]">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={clsx(
                                    "py-1.5 px-4  rounded-full",
                                    pathname === item.href
                                        ? "font-bold bg-background"
                                        : "hover:bg-white-transparent-tone",
                                )}
                            >
                                {item.text}
                            </Link>
                        ))}
                        <Link
                            href={routes.home}
                            className="py-1.5 px-4 hover:bg-white-transparent-tone rounded-full"
                        >
                            Resume
                        </Link>
                    </div>
                    <Button
                        href={routes.contact}
                        className="btn-fill-primary btn-base"
                    >
                        Book A Call
                    </Button>
                </div>
            </div>
        </header>
    );
}

const navItems = [
    {
        text: "Home",
        href: routes.home,
    },
    {
        text: "Blog",
        href: routes.blog,
    },
];
