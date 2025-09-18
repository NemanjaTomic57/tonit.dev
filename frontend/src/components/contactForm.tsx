'use client';

import { apiUrl } from '@/environment';
import { routes } from '@/routes';
import { formatDateTimeToMeetingTime, formatMeetingTimeToDateTimeOffset } from '@/utils/dateTime';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import Button from './ui/button';
import InputDropdown from './ui/inputDropdown';
import InputText from './ui/inputText';
import InputTextarea from './ui/inputTextarea';

interface Props {
    timeOptions: string[];
}

const contactSchema = z.object({
    name: z.string().nonempty('Please enter your name'),
    company: z.string().nonempty('Please enter the company you represent'),
    email: z.email('Please enter a valid email address'),
    appointmentTime: z.string().nonempty('Please select a time for our appointment'),
    appointmentTimeUtc: z.string().nullish(),
    message: z.string().nullable(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactForm({ timeOptions }: Props) {
    const methods = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            appointmentTime: '',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<ContactSchema> = async (req) => {
        const utc = formatMeetingTimeToDateTimeOffset(req.appointmentTime);
        req.appointmentTimeUtc = utc;

        try {
            const { data } = await axios.post(apiUrl + 'lead/book-appointment', req);
            sessionStorage.setItem('appointmentData', JSON.stringify(data));
            window.location.pathname = routes.confirmation;
        } catch (error) {
            generalErrorToast();
        }
    };

    timeOptions = timeOptions.map((t) => formatDateTimeToMeetingTime(t));

    return (
        <div id="contact" className="bg-primary-tint">
            <div className="container-sm py-container-sm-vert">
                <div className="mb-8 text-center">
                    <h2>Talk To Me</h2>
                    <p>Want more details? Fill out the form, and I’ll personally send you a Zoom meeting invitation.</p>
                </div>

                <div className="font-girloy shadow-card-lg border-foreground/10 bg-background rounded-xl border-1 p-4 sm:p-6 md:rounded-2xl lg:p-8">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 md:grid-cols-2 md:gap-2 md:text-[0.9rem] lg:text-base">
                            <InputText label="Name" inputName="name" />
                            <InputText label="Email" inputName="email" />
                            <InputText label="Company" inputName="company" />
                            <InputDropdown inputName="appointmentTime" initialText="Date & Time" options={timeOptions} />
                            <div className="mt-0.5 md:col-span-2">
                                <InputTextarea label="Message (optional)" inputName="message" />
                            </div>
                            <Button className="font-aenotik btn-fill-primary btn-lg w-full md:col-span-2" disabled={isSubmitting}>
                                Book A Call
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}
