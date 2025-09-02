import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    href?: string;
    onClick?: () => void;
    className?: string;
    children: ReactNode;
}

export default function Button({ href, onClick, className, children }: Props) {
    const btnClassName =
        "block rounded-sm font-bold cursor-pointer transition-all transition-duration-200";

    return (
        <>
            {href ? (
                <Link
                    onClick={onClick}
                    href={href}
                    className={clsx(className, btnClassName)}
                >
                    {children}
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={clsx(className, btnClassName)}
                >
                    {children}
                </button>
            )}
        </>
    );
}
