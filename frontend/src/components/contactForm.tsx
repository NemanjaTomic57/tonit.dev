"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import InputText from "./ui/inputText";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputDropdown from "./ui/inputDropdown";
import InputTextarea from "./ui/inputTextarea";
import Button from "./ui/button";

const contactSchema = z.object({
    name: z.string().nonempty("Please enter your name"),
    company: z.string().nonempty("Please enter the company you represent"),
    email: z.email("Please enter a valid email address"),
    dateTime: z.string().nonempty("Please select a time for our appointment"),
    message: z.string().nullable(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const methods = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            dateTime: "",
        },
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<ContactSchema> = (data) => {
        console.log(data);
    };

    return (
        <div id="contact" className="bg-primary-tint">
            <div className="container-sm py-container-sm-vert">
                <div className="text-center mb-8">
                    <h2>Talk To Me</h2>
                    <p>
                        Want more details? Fill out the form, and I’ll
                        personally send you a Zoom meeting invitation.
                    </p>
                </div>

                <div className="font-girloy rounded-xl md:rounded-2xl p-4 sm:p-8 shadow-card-lg border-1 border-foreground/10 bg-background">
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid md:grid-cols-2 gap-2 md:gap-2 md:text-[0.9rem] lg:text-base"
                        >
                            <InputText label="Name" inputName="name" />
                            <InputText label="Email" inputName="email" />
                            <InputText label="Company" inputName="company" />
                            <InputDropdown
                                inputName="dateTime"
                                initialText="Choose an available date and time"
                                options={timeOptions}
                            />
                            <div className="md:col-span-2 mt-0.5">
                                <InputTextarea
                                    label="Message (optional)"
                                    inputName="message"
                                />
                            </div>
                            <Button className="font-aenotik btn-fill-primary btn-lg w-full md:col-span-2">
                                Book A Call
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}

const timeOptions = [
    "Thursday, September 4 at 10:00 AM",
    "Thursday, September 4 at 3:00 PM",
    "Friday, September 5 at 11:00 AM",
    "Friday, September 5 at 2:00 PM",
    "Monday, September 8 at 9:30 AM",
    "Monday, September 8 at 4:00 PM",
    "Tuesday, September 9 at 1:00 PM",
    "Wednesday, September 10 at 5:00 PM",
];
