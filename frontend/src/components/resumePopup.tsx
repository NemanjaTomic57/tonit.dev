import { Dispatch, SetStateAction, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import Overlay from "./overlay";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "./ui/inputText";
import Button from "./ui/button";
import axios from "axios";
import { apiUrl } from "@/environment";
import toast from "react-hot-toast";
import Icon from "./ui/icon";
import clsx from "clsx";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const emailSchema = z.object({
    name: z.string().nonempty("Please enter your name"),
    email: z.email("Please enter a valid email adress"),
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
            await axios.post(apiUrl + "lead/send-resume", data);
            toast.success("Check your inbox.");
        } catch (error) {
            toast.error("Something unexpected happened...");
        }
    };

    return (
        <>
            {show && (
                <>
                    <Overlay />
                    <div
                        ref={ref}
                        className="fixed p-4 sm:p-6 md:p-18 inset-0 m-auto rounded-lg bg-white/80 border-1 border-gray-tint z-50 w-[310px] sm:w-[480px] md:w-[700px] h-fit"
                    >
                        <p className="text-center sm:text-2xl md:text-3xl mb-8">
                            Enter your email to receive my resume and my
                            certifications for free!
                        </p>

                        <FormProvider {...methods}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                className="grid gap-2"
                            >
                                <InputText
                                    label="Name"
                                    inputName="name"
                                    className="bg-gray-tint/10"
                                />
                                <InputText
                                    label="Email Adress"
                                    inputName="email"
                                    className="bg-gray-tint/10"
                                />
                                <Button
                                    className={clsx(
                                        "btn-fill-primary btn-lg flex items-center justify-center gap-2",
                                        isSubmitting &&
                                            "bg-primary/80! hover:bg-primary/80! cursor-default!",
                                    )}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Icon
                                                name="loader"
                                                size="xs"
                                                className="animate-spin"
                                            />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </>
            )}
        </>
    );
}
