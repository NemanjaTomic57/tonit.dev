'use client';

import { Markdown } from '@/components/markdown';
import Button from '@/components/ui/button';
import ButtonDisabledText from '@/components/ui/buttonDisabledText';
import InputCalendar from '@/components/ui/inputCalendar';
import InputText from '@/components/ui/inputText';
import { apiUrl } from '@/environment';
import { generalErrorToast, notLoggedInToast } from '@/utils/generalErrorToast';
import { slugify } from '@/utils/slugs';
import { zodResolver } from '@hookform/resolvers/zod';
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

export default function CreateBlogPost() {
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            author: 'Nemanja Tomic',
        },
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = methods;
    const markdown = watch('markdown');

    const onSubmit: SubmitHandler<Schema> = async (req) => {
        req.slug = slugify(req.heading);
        const res = await fetch(apiUrl + 'blog/create', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
        });

        if (res.status === 201) {
            toast.success('Post uploaded.');
        } else if (res.status === 401) {
            notLoggedInToast();
        } else {
            generalErrorToast();
        }
    };

    return (
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
                <div className="grid grid-cols-[800px_700px] items-stretch gap-20">
                    <textarea {...register('markdown')} placeholder="Markdown" className="border-gray-tint w-full border-1 p-2" />
                    <Markdown markdown={markdown} />
                </div>
            </form>
        </FormProvider>
    );
}
