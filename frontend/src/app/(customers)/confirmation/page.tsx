'use client';

import { ContactSchema } from '@/components/contactForm';
import Button from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Confirmation() {
    const [appointmentData, setAppointmentData] = useState<ContactSchema | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('appointmentData');
        if (stored) {
            setAppointmentData(JSON.parse(stored));
        }
    }, [setAppointmentData]);

    return (
        <div className="py-container-sm-vert container-sm grid place-items-center">
            {appointmentData && (
                <div className="border-gray-shade bg-background max-w-[800px] rounded-xl border-1 p-8 text-center shadow-md">
                    <h3>Thank you for your trust</h3>
                    <p className="mx-auto max-w-[600px]">
                        I will soon send you the link to our Zoom call. For your convenience, you will also receive an email with the information you
                        see below.
                    </p>
                    <ul className="mt-10 mb-4 grid grid-cols-[130px_1fr] gap-1 text-left sm:grid-cols-[240px_1fr] md:mt-14 md:mb-6 [&>li]:line-clamp-3 [&>li:nth-child(odd)]:font-bold">
                        <li>Name:</li>
                        <li>{appointmentData.name}</li>
                        <li>Email:</li>
                        <li>{appointmentData.email}</li>
                        <li>Company:</li>
                        <li>{appointmentData.company}</li>
                        <li>Date & Time:</li>
                        <li>{appointmentData.appointmentTime}</li>
                        {appointmentData.message && (
                            <>
                                <li>Your Message:</li>
                                <li>{appointmentData.message}</li>
                            </>
                        )}
                    </ul>
                    <Button onClick={() => window.history.back()} className="btn-fill-primary btn-base">
                        Back
                    </Button>
                </div>
            )}
        </div>
    );
}
