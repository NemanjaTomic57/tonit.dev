import { Dispatch, SetStateAction, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import Overlay from "./overlay";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "./ui/inputText";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const emailSchema = z.object({
    email: z.email("Please enter a valid email adress"),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function ResumePopup({ show, setShow }: Props) {
    const ref = useRef(null);
    const methods = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });
    const { handleSubmit } = methods;

    useOnClickOutside(ref, () => setShow(false));

    const onSubmit: SubmitHandler<EmailSchema> = (data) => {
        console.log(data);
    };

    return (
        <>
            {show && (
                <>
                    <Overlay />
                    <div
                        ref={ref}
                        className="fixed p-4 sm:p-6 md:p-18 inset-0 m-auto rounded-2xl md:rounded-4xl bg-white/80 border-1 border-gray-tint z-50 w-[310px] sm:w-[480px] md:w-[700px] h-fit"
                    >
                        <p className="text-center md:text-3xl mb-8">
                            Enter your email to receive my resume and my
                            certifications for free!
                        </p>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <InputText
                                    label="Email"
                                    inputName="email"
                                    button
                                />
                            </form>
                        </FormProvider>
                    </div>
                </>
            )}
        </>
    );
}
