"use client";

import Button from "@/components/ui/button";
import InputText from "@/components/ui/inputText";
import { apiUrl } from "@/environment";
import { generalErrorToast } from "@/utils/generalErrorToast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const schema = z.object({
    username: z.string(),
    password: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function Admin() {
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        try {
            await axios.post(apiUrl + "admin/login", data, {
                withCredentials: true,
            });
            toast.success("Logged in");
        } catch (error) {
            generalErrorToast();
        }
    };

    return (
        <div className="fixed inset-0 p-8 m-auto h-fit w-[600px] rounded-sm shadow-card">
            <h3 className="text-center">Welcome Back</h3>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <InputText label="Username" inputName="username" />
                    <InputText
                        type="password"
                        label="Password"
                        inputName="password"
                    />
                    <Button className="btn-base btn-fill-primary">
                        Submit
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
}
