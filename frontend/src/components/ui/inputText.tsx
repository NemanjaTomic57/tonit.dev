"use client";

import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import clsx from "clsx";
import { useState } from "react";

interface Props {
    label: string;
    inputName: string;
    button?: boolean;
    className?: string;
    errorClassName?: string;
}

export default function InputText({
    label,
    inputName,
    button,
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
                    type="text"
                    placeholder={placeholder}
                    onFocus={() => setPlaceholder("")}
                    onBlur={() => setPlaceholder(label)}
                />
                {button && (
                    <button className="btn-fill-primary rounded-md absolute right-1 top-1 bottom-1 px-4 sm:px-8 text-sm font-bold cursor-pointer">
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
