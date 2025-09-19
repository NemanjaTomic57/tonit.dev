import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}

export default function Button({ href, onClick, className, disabled, children }: Props) {
    const btnClassName = 'block rounded-sm text-center font-bold cursor-pointer transition-all transition-duration-200 select-none!';

    return (
        <>
            {href ? (
                <Link onClick={onClick} href={href} className={clsx(className, btnClassName)}>
                    {children}
                </Link>
            ) : (
                <button onClick={onClick} disabled={disabled} className={clsx(className, btnClassName)}>
                    {children}
                </button>
            )}
        </>
    );
}
