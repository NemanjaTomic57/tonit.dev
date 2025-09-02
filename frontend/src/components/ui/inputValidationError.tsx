import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function InputValidationError({ children, className }: Props) {
    return (
        <p className={clsx("text-red-500 text-sm mb-0!", className)}>
            {children}
        </p>
    );
}
