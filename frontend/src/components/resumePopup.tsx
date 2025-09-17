import { apiUrl } from '@/environment';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import Overlay from './overlay';
import Button from './ui/button';
import ButtonDisabledText from './ui/buttonDisabledText';
import InputText from './ui/inputText';

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const emailSchema = z.object({
    name: z.string().nonempty('Please enter your name'),
    email: z.email('Please enter a valid email adress'),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function ResumePopup({ show, setShow }: Props) {
    const ref = useRef(null);
    const methods = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useOnClickOutside(ref, () => setShow(false));

    const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
        try {
            await axios.post(apiUrl + 'lead/send-resume', data);
            toast.success('Check your inbox.');
        } catch (error) {
            console.error(error);
            generalErrorToast();
        }
    };

    return (
        <>
            {show && (
                <>
                    <Overlay />
                    <div
                        ref={ref}
                        className="border-gray-tint fixed inset-0 z-50 m-auto h-fit w-[310px] rounded-lg border-1 bg-white/80 p-4 sm:w-[480px] sm:p-6 md:w-[700px] md:p-18"
                    >
                        <p className="mb-8 text-center sm:text-2xl md:text-3xl">
                            Enter your email to receive my resume and my certifications for free!
                        </p>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-2">
                                <InputText label="Name" inputName="name" className="bg-gray-tint/10" />
                                <InputText label="Email Adress" inputName="email" className="bg-gray-tint/10" />
                                <Button
                                    className={clsx('btn-fill-primary btn-lg', isSubmitting && 'btn-fill-primary-submitting')}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <ButtonDisabledText /> : 'Submit'}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </>
            )}
        </>
    );
}
