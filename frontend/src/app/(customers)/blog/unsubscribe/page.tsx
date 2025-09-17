'use client';

import { apiUrl } from '@/environment';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function Unsubscribe() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const encodedEmail = encodeURIComponent(email || '');

    const unsubscribe = async () => {
        try {
            const r = await axios.delete(apiUrl + `blog/unsubscribe/${encodedEmail}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        unsubscribe();
    });

    return (
        <div className="container-sm py-container-sm-vert">
            <h2 className="text-center">You successfully unsubscribed from my blog</h2>
        </div>
    );
}

export default function UnsubscribeSuspense() {
    return (
        <Suspense>
            <Unsubscribe />
        </Suspense>
    );
}
