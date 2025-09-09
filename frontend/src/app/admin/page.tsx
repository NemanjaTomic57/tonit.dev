"use client";

import InputText from "@/components/ui/inputText";
import InputTextarea from "@/components/ui/inputTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
    heading: z.string(),
    markdown: z.string(),
    publicationDate: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function Admin() {
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Schema> = (data) => {
        console.log(data);
    };

    return (
        <div className="container py-container-sm-vert grid grid-cols-2 gap-20">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <InputText label="Heading" inputName="heading" />
                    <InputTextarea
                        label="Markdown"
                        inputName="markdown"
                        rows={30}
                    />
                </form>
            </FormProvider>
        </div>
    );
}
