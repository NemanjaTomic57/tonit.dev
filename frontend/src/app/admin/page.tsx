'use client';

import { Markdown } from '@/components/markdown';
import Button from '@/components/ui/button';
import ButtonDisabledText from '@/components/ui/buttonDisabledText';
import InputCalendar from '@/components/ui/inputCalendar';
import InputText from '@/components/ui/inputText';
import InputTextarea from '@/components/ui/inputTextarea';
import { apiUrl } from '@/environment';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { routes } from '@/routes';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

const schema = z.object({
    heading: z.string().nonempty('Please enter a heading'),
    thumbnailSlug: z.string().nonempty('Please enter a URL for the thumbnail'),
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
        defaultValues: {
            author: 'Nemanja Tomic',
        },
    });
    const {
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;
    const markdown = watch('markdown');

    const onSubmit: SubmitHandler<Schema> = async (req) => {
        req.slug = req.heading.toLowerCase();
        const token = localStorage.getItem('jwt');
        try {
            await axios.post(apiUrl + 'blog/create', req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Post uploaded');
        } catch (error) {
            console.error(error);
            generalErrorToast();
        }
    };

    return (
        <div className="container py-8">
            <div className="grid grid-cols-[200px_1fr] gap-4">
                <div className="flex flex-col gap-2">
                    <Button className="btn-fill-primary btn-lg">Create Post</Button>
                    <Button className="btn-fill-primary btn-lg">Update Post</Button>
                    <Button className="btn-fill-primary btn-lg">Delete Post</Button>
                    <Button href={routes.home} className="btn-fill-primary btn-lg">
                        Home
                    </Button>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            <InputText label="Heading" inputName="heading" className="w-[700px]" />
                            <InputText label="Thumbnail URL" inputName="thumbnailSlug" className="w-50" />
                            <InputText label="Author" inputName="author" className="w-50" />
                            <InputCalendar inputName="publicationDate" />
                            <Button
                                className={clsx('btn-lg btn-fill-primary ml-auto h-fit', isSubmitting && 'btn-fill-primary-submitting')}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <ButtonDisabledText /> : 'Create Post'}
                            </Button>
                        </div>
                        <div className="grid grid-cols-[800px_700px] gap-20">
                            <InputTextarea label="Markdown" inputName="markdown" className="resize-y!" rows={20} />
                            <Markdown markdown={markdown} />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
