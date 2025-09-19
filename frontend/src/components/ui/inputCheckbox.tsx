'use client';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import InputValidationError from './inputValidationError';

interface Props {
    label: string;
    inputName: string;
    inputClassName?: string;
    className?: string;
    errorClassName?: string;
}

export default function InputCheckbox({ label, inputName, inputClassName, className, errorClassName }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[inputName]?.message as string;

    return (
        <div>
            <div className={clsx('flex items-center gap-2', className)}>
                <input {...register(inputName)} id={inputName} type="checkbox" className={inputClassName} />
                <label htmlFor={inputName}>{label}</label>
            </div>
            <InputValidationError className={errorClassName}>{errorMessage}</InputValidationError>
        </div>
    );
}
