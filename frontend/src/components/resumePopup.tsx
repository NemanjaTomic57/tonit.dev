import { Dispatch, SetStateAction, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import Overlay from "./overlay";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const emailSchema = z.object({
    email: z
        .email("Please enter a valid email adress")
        .nonempty("Please enter your email adress"),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function ResumePopup({ show, setShow }: Props) {
    const ref = useRef(null);
    const methods = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
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
                        className="fixed p-18 top-3/7 left-1/2 -translate-1/2 rounded-4xl bg-white/80 border-1 border-gray-tint z-50 w-[700px]"
                    >
                        <p className="text-center text-3xl mb-8">
                            Enter your email to receive my resume and my
                            certifications for free!
                        </p>

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="relative bg-gray-tint/10 border-1 border-gray-tint rounded-full">
                                    <label className="absolute text-sm top-1/2 -translate-y-1/2 pointer-events-none text-gray-tint pl-5">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="h-full w-full py-3 px-5 outline-none"
                                    />

                                    <button className="btn-fill-primary rounded-full absolute right-1 top-1 bottom-1 px-8 text-sm font-bold cursor-pointer">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </>
            )}
        </>
    );
}
