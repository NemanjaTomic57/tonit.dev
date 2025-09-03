"use client";

import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";
import { useState } from "react";

interface Props {
    label: string;
    inputName: string;
    className?: string;
}

export default function InputTextarea({ label, inputName, className }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const [placeholder, setPlaceholder] = useState(label);
    const errorMessage = errors[inputName]?.message as string;

    return (
        <>
            <textarea
                {...register(inputName)}
                placeholder={placeholder}
                onFocus={() => setPlaceholder("")}
                onBlur={() => setPlaceholder(label)}
                rows={7}
                className={clsx(
                    "form-input-standard w-full resize-none",
                    className,
                )}
            />
            <InputValidationError className="md:absolute">
                {errorMessage}
            </InputValidationError>
        </>
    );
}
