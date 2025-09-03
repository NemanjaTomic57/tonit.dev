"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import InputText from "./ui/inputText";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
    name: z.string(),
    company: z.string(),
    email: z.string(),
    dateTime: z.string(),
    message: z.string().nullable(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const methods = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<ContactSchema> = (data) => {
        console.log(data);
    };

    return (
        <div className="container-sm py-container-sm-vert">
            <div className="text-center">
                <h2>Talk To Me</h2>
                <p>
                    Want more details? Fill out the form, and I’ll personally
                    send you a Zoom meeting invitation.
                </p>
            </div>

            <div className="rounded-2xl p-8">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputText label="Name" inputName="name" />
                        <InputText label="Company" inputName="company" />
                        <InputText label="Email" inputName="email" />
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
