'use client';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import InputValidationError from './inputValidationError';

interface Props {
    inputName: string;
    type?: string;
    button?: boolean;
    buttonClassName?: string;
    inputClassName?: string;
    className?: string;
    errorClassName?: string;
}

export default function InputCalendar({ inputName, inputClassName, className, errorClassName }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[inputName]?.message as string;

    return (
        <div>
            <div className={clsx('form-input-standard w-fit!', className)}>
                <input {...register(inputName)} type="date" className={inputClassName} defaultValue="" />
            </div>
            <InputValidationError className={errorClassName}>{errorMessage}</InputValidationError>
        </div>
    );
}
