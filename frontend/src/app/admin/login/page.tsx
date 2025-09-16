'use client';

import Button from '@/components/ui/button';
import InputText from '@/components/ui/inputText';
import { apiUrl } from '@/environment';
import { routes } from '@/routes';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
    username: z.string(),
    password: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function Login() {
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Schema> = async (req) => {
        try {
            const { data } = await axios.post(apiUrl + 'admin/login', req);
            localStorage.setItem('jwt', data.token);
            window.location.pathname = routes.admin;
        } catch (error) {
            console.error(error);
            generalErrorToast();
        }
    };

    return (
        <div className="shadow-card fixed inset-0 m-auto h-fit w-[600px] rounded-sm p-8">
            <h3 className="text-center">Welcome Back</h3>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <InputText label="Username" inputName="username" />
                    <InputText type="password" label="Password" inputName="password" />
                    <Button className="btn-base btn-fill-primary">Submit</Button>
                </form>
            </FormProvider>
        </div>
    );
}
