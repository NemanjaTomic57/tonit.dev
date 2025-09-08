"use client";

import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";
import { useState } from "react";

interface Props {
    label: string;
    inputName: string;
    type?: string;
    button?: boolean;
    buttonClassName?: string;
    inputClassName?: string;
    className?: string;
    errorClassName?: string;
}

export default function InputText({
    label,
    inputName,
    type = "text",
    button,
    buttonClassName = "btn-fill-primary",
    inputClassName,
    className,
    errorClassName,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const [placeholder, setPlaceholder] = useState(label);
    const errorMessage = errors[inputName]?.message as string;

    return (
        <div>
            <div className={clsx("form-input-standard", className)}>
                <input
                    {...register(inputName)}
                    type={type}
                    placeholder={placeholder}
                    onFocus={() => setPlaceholder("")}
                    onBlur={() => setPlaceholder(label)}
                    className={inputClassName}
                />
                {button && (
                    <button
                        className={clsx(
                            "rounded-xs absolute right-0.5 top-0.5 bottom-0.5 md:top-1 md:bottom-1 md:right-1 px-4 sm:px-8 text-sm font-bold cursor-pointer",
                            buttonClassName,
                        )}
                    >
                        Submit
                    </button>
                )}
            </div>
            <InputValidationError className={errorClassName}>
                {errorMessage}
            </InputValidationError>
        </div>
    );
}
