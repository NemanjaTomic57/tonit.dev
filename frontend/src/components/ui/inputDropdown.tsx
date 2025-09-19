'use client';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import { Fragment, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Icon from './icon';
import InputValidationError from './inputValidationError';

interface Props {
    inputName: string;
    initialText: string;
    options: string[];
}

export default function InputDropdown({ inputName, initialText, options }: Props) {
    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const [activeText, setActiveText] = useState(initialText);
    const [showDd, setShowDd] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

    const ref = useRef<HTMLDivElement>(null);
    const errorMessage = errors[inputName]?.message as string;

    // Close dropdown when clicked outside
    useOnClickOutside(ref, () => setShowDd(false));

    // Handle click on an option
    function handleClick(option: string) {
        setActiveText(option);
        setShowDd(false);
        setValue(inputName, option, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    // Handle keydown event for keyboard users
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (!showDd) {
            if (e.key === 'Enter' || e.key === ' ') {
                setShowDd(true);
                setHighlightIndex(0);
                e.preventDefault();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            setHighlightIndex((prev) => (prev === null ? 0 : (prev + 1) % options.length));
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setHighlightIndex((prev) => (prev === null ? options.length - 1 : (prev - 1 + options.length) % options.length));
            e.preventDefault();
        } else if (e.key === 'Enter' || e.key === ' ') {
            if (highlightIndex !== null) {
                handleClick(options[highlightIndex]);
            }
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setShowDd(false);
            e.preventDefault();
        }
    }

    return (
        <div>
            <div
                tabIndex={0}
                onClick={() => {
                    setHighlightIndex(null);
                    setShowDd(!showDd);
                }}
                onKeyDown={handleKeyDown}
                className="group relative w-full outline-none"
                ref={ref}
            >
                <div
                    className={clsx(
                        'form-input-standard flex cursor-pointer items-center justify-between gap-3',
                        showDd && 'rounded-b-none! border-b-transparent!',
                    )}
                >
                    <div className={clsx('dropdown-input truncate select-none', activeText === initialText && 'placeholder')}>{activeText}</div>
                    <Icon name="angleDown" size="xs" color="var(--gray-tone)" className="pr-4" />
                </div>

                {showDd && (
                    <div className="border-gray-tint/80 bg-background absolute z-10 grid w-full rounded-b-lg border-1 border-t-0">
                        {options.map((option, index) => (
                            <Fragment key={index}>
                                <div className="bg-gray-tint/20 mx-2 h-[1px] last:hidden"></div>
                                <button
                                    type="button"
                                    onClick={() => handleClick(option)}
                                    className={clsx(
                                        'text-gray-tone hover:bg-gray-tint/20 cursor-pointer px-2 py-2 text-left text-sm font-bold outline-none sm:px-5',
                                        activeText === option && 'bg-gray-tint/10',
                                        highlightIndex === index && 'bg-gray-tint/20',
                                    )}
                                >
                                    {option}
                                </button>
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
            <InputValidationError>{errorMessage}</InputValidationError>
        </div>
    );
}
