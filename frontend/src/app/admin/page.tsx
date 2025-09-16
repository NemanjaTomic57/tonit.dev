'use client';

import Button from '@/components/ui/button';
import InputCalendar from '@/components/ui/inputCalendar';
import InputText from '@/components/ui/inputText';
import InputTextarea from '@/components/ui/inputTextarea';
import { apiUrl } from '@/environment';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import z from 'zod';

const schema = z.object({
    heading: z.string().nonempty('Please enter a heading'),
    author: z.string().nonempty('Please enter your name'),
    markdown: z.string().nonempty('Please enter your blog post'),
    publicationDate: z.string().nonempty('Please set a publication date'),
    slug: z.string().nullish(),
});

type Schema = z.infer<typeof schema>;

export default function Admin() {
    useAdminGuard();
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const { handleSubmit, watch } = methods;
    const markdown = watch('markdown');

    const onSubmit: SubmitHandler<Schema> = async (req) => {
        req.slug = req.heading.toLowerCase();
        const token = localStorage.getItem('jwt');
        try {
            const r = await axios.post(apiUrl + 'blog/create-blog-post', req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(r.data);
        } catch (error) {
            console.error(error);
            generalErrorToast();
        }
    };

    return (
        <div className="container py-8">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8 flex items-center gap-4">
                        <InputText label="Heading" inputName="heading" className="w-200" errorClassName="absolute" />
                        <InputText label="Author" inputName="author" className="w-80" errorClassName="absolute" />
                        <InputCalendar inputName="publicationDate" errorClassName="absolute" />
                        <Button className="btn-lg btn-fill-primary ml-auto h-fit">Create Post</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <InputTextarea label="Markdown" inputName="markdown" rows={80} />
                        <div className="blog-post max-w-[700px]">
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
