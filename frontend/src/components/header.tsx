"use client";

import { routes } from "@/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/button";
import Image from "next/image";
import ResumePopup from "./resumePopup";
import { useContext } from "react";
import { ResumePopupContext } from "./contextProviders/resumePopupProvider";

export default function Header() {
    const pathname = usePathname();
    const { showResumePopup, setShowResumePopup } =
        useContext(ResumePopupContext);

    return (
        <>
            <ResumePopup show={showResumePopup} setShow={setShowResumePopup} />

            <header className="relative">
                <div className="-z-10 absolute top-0 w-full h-[400px]">
                    <Image src="/images/hero__overlay.png" alt="" fill />
                </div>
                <div className="container flex h-[70px] w-full justify-end items-center">
                    <div className="absolute gap-1 left-1/2 top-1/2 -translate-1/2 flex bg-white-transparent-tint  rounded-sm py-[4px] px-[5px]">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={clsx(
                                    "py-1.5 px-4  rounded-sm",
                                    pathname === item.href
                                        ? "font-bold bg-background"
                                        : "hover:bg-white-transparent-tone",
                                )}
                            >
                                {item.text}
                            </Link>
                        ))}
                        <button
                            onClick={() => setShowResumePopup(true)}
                            className="py-1.5 px-4 hover:bg-white-transparent-tone rounded-sm cursor-pointer"
                        >
                            Resume
                        </button>
                    </div>
                    <Button
                        href={routes.contact}
                        className="btn-fill-primary btn-base"
                    >
                        Book A Call
                    </Button>
                </div>
            </header>
        </>
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
