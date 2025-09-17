import { apiUrl } from '@/environment';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import InputText from './ui/inputText';
import footerBackground from '/public/images/footer__background.png';

const emailSchema = z.object({
    email: z.email('Please enter a valid email adress'),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function BlogSubscription() {
    const methods = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<EmailSchema> = async (req) => {
        try {
            await axios.post(apiUrl + 'blog/subscribe', req);
            toast.success('Subscription successfull. Check your email.');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 400) {
                    toast.error('Your email already subscribed to our blog.');
                } else {
                    toast.error('Something went wrong when we tried to add your email to our list. Please try again.');
                }
            }
        }
    };

    return (
        <div className="bg-primary text-foreground/80 relative">
            <div className="absolute inset-0 z-0">
                <Image src={footerBackground} alt="" fill sizes="100vw" className="object-cover" />
            </div>

            <div className="text-background relative z-10 container py-12 text-center">
                <h3 className="font-normal!">Subscribe To My Blog</h3>
                <p className="pb-6">Enter your email to receive the latest articles about tech, work and life.</p>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mx-auto max-w-[700px]">
                            <InputText
                                label="Enter Email Adress"
                                inputName="email"
                                inputClassName="placeholder-background!"
                                button
                                buttonClassName="btn-fill-background"
                                errorClassName="md:absolute text-background!"
                                className="bg-primary/30 border-background! placeholder-background!"
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
