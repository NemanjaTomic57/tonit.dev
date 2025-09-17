'use client';

import clsx from 'clsx';
import { useContext } from 'react';
import { RootContext } from '../contextProviders/rootContextProvider';
import Button from './button';

interface Props {
    className?: string;
}

export default function ButtonShowResumePopup({ className }: Props) {
    const { setShowResumePopup } = useContext(RootContext);

    return (
        <Button className={clsx('btn-fill-primary btn-lg', className)} onClick={() => setShowResumePopup(true)}>
            Download Resume
        </Button>
    );
}
