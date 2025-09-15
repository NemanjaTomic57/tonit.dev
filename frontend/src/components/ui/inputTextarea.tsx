'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputValidationError from './inputValidationError';

interface Props {
    label: string;
    inputName: string;
    rows?: number;
    className?: string;
}

export default function InputTextarea({ label, inputName, rows = 7, className }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const [placeholder, setPlaceholder] = useState(label);
    const errorMessage = errors[inputName]?.message as string;

    return (
        <div>
            <div className="form-input-standard">
                <textarea
                    {...register(inputName)}
                    placeholder={placeholder}
                    onFocus={() => setPlaceholder('')}
                    onBlur={() => setPlaceholder(label)}
                    rows={rows}
                    className={clsx('w-full resize-none', className)}
                />
            </div>
            <InputValidationError className="md:absolute">{errorMessage}</InputValidationError>
        </div>
    );
}
