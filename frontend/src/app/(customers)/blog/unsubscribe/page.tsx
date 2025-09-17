'use client';

import { useSearchParams } from 'next/navigation';

export default function Unsubscribe() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    console.log(email);

    return (
        <div className="container-sm py-container-sm-vert">
            <h2 className="text-center">You successfully unsubscribed from my blog</h2>
        </div>
    );
}
