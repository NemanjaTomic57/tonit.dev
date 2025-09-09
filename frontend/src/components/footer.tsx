"use client";

import Image from "next/image";
import footerBackground from "/public/images/footer__background.png";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputText from "./ui/inputText";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { routes } from "@/routes";
import toTopButton from "/public/images/footer__to-top-button.png";

const emailSchema = z.object({
    email: z.email("Please enter a valid email adress"),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const methods = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<EmailSchema> = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="bg-primary relative text-foreground/80">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={footerBackground}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="container py-12 text-background text-center z-10 relative">
                    <h3 className="font-normal!">Subscribe To My Blog</h3>
                    <p className="pb-6">
                        Enter your email to receive the latest articles about
                        tech, work and life.
                    </p>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="max-w-[700px] mx-auto">
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

            <div className="container relative flex justify-end items-center h-[80px]">
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 sm:gap-12 text-sm">
                    <Link href={routes.home} className="hover:underline">
                        Home
                    </Link>
                    <Link href={routes.blog} className="hover:underline">
                        Blog
                    </Link>
                    <Link href={routes.contact} className="hover:underline">
                        Contact
                    </Link>
                </div>

                <Image
                    src={toTopButton}
                    alt="Navigate to top"
                    width={60}
                    height={60}
                    className="cursor-pointer hidden sm:block rounded-full pointer-events-auto! select-auto"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                />
            </div>

            <div className="container">
                <div className="w-full border-b-1"></div>
            </div>

            <div className="container flex justify-center gap-4 text-sm my-8">
                <div>© {currentYear} Nemanja Tomic. All rights reserved.</div>
            </div>
        </>
    );
}
