'use client';

import { apiUrl } from '@/environment';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import Button from './ui/button';
import ButtonDisabledText from './ui/buttonDisabledText';
import InputText from './ui/inputText';
import InputTextarea from './ui/inputTextarea';

// interface Props {
//     timeOptions: string[];
// }

const contactSchema = z.object({
    email: z.email('Please enter a valid email address'),
    phoneNumber: z.string().nullable(),
    content: z.string().nonempty('Please enter your message'),
    // name: z.string().nonempty('Please enter your name'),
    // company: z.string().nonempty('Please enter the company you represent'),
    // appointmentTime: z.string().nonempty('Please select a time for our appointment'),
    // appointmentTimeUtc: z.string().nullish(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const methods = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<ContactSchema> = async (req) => {
        try {
            await axios.post(apiUrl + 'lead/message', req);
            toast.success('Your message has been sent.');
            // sessionStorage.setItem('appointmentData', JSON.stringify(data));
            // window.location.pathname = routes.confirmation;
        } catch (error) {
            generalErrorToast();
            console.error(error);
        }
    };

    // timeOptions = timeOptions.map((t) => formatDateTimeToMeetingTime(t));

    return (
        <div id="contact" className="bg-primary-tint">
            <div className="container-sm py-container-sm-vert">
                <div className="mb-8 text-center">
                    <h2>Talk To Me</h2>
                    <p>Want more details? Fill out the form, and I’ll personally get back to you ASAP.</p>
                </div>

                <div className="font-girloy shadow-card-lg border-foreground/10 bg-background rounded-xl border-1 p-4 sm:p-6 md:rounded-2xl lg:p-8">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 md:grid-cols-2 md:gap-2 md:text-[0.9rem] lg:text-base">
                            <InputText label="Email" inputName="email" />
                            <InputText label="Phone number (optional)" inputName="phoneNumber" />
                            <div className="mt-0.5 md:col-span-2">
                                <InputTextarea label="Message" inputName="content" />
                            </div>
                            {/*                             
                            <InputText label="Company" inputName="company" />
                            <InputDropdown inputName="appointmentTime" initialText="Date & Time" options={timeOptions} />
                            */}
                            <Button
                                className={clsx(
                                    'font-aenotik btn-fill-primary btn-lg w-full md:col-span-2',
                                    isSubmitting && 'btn-fill-primary-submitting',
                                )}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <ButtonDisabledText /> : 'Book a Call'}
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}
