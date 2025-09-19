'use client';

import { Markdown } from '@/components/markdown';
import Button from '@/components/ui/button';
import ButtonDisabledText from '@/components/ui/buttonDisabledText';
import InputCalendar from '@/components/ui/inputCalendar';
import InputCheckbox from '@/components/ui/inputCheckbox';
import InputText from '@/components/ui/inputText';
import InputTextarea from '@/components/ui/inputTextarea';
import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import { generalErrorToast } from '@/utils/generalErrorToast';
import { slugify } from '@/utils/slugs';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

const schema = z.object({
    id: z.number(),
    heading: z.string().nonempty('Please enter a heading'),
    thumbnailSlug: z.string().nonempty('Please enter a URL for the thumbnail'),
    author: z.string().nonempty('Please enter your name'),
    markdown: z.string().nonempty('Please enter your blog post'),
    publicationDate: z.string().nonempty('Please set a publication date'),
    slug: z.string().nullish(),
    hidden: z.boolean().nonoptional(),
});

type Schema = z.infer<typeof schema>;

export default function UpdateBlogPost() {
    const params = useParams();
    const slug = params?.slug as string;

    const [loading, setLoading] = useState(true);

    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const {
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = methods;

    const markdown = watch('markdown');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogPost = await axios.get(apiUrl + `blog/get/${slug}`).then((r) => r.data as Blog);
                reset({
                    id: blogPost.id,
                    author: blogPost.author,
                    heading: blogPost.heading,
                    thumbnailSlug: blogPost.thumbnailSlug,
                    markdown: blogPost.markdown,
                    publicationDate: blogPost.publicationDate
                        ? blogPost.publicationDate.split('T')[0] // <-- Format fix
                        : new Date().toISOString().split('T')[0],
                    slug: blogPost.slug,
                    hidden: blogPost.hidden,
                });
                console.log(blogPost);
            } catch (error) {
                generalErrorToast();
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, reset]);

    const onSubmit: SubmitHandler<Schema> = async (req) => {
        req.slug = slugify(req.heading);
        const token = localStorage.getItem('jwt');
        try {
            await axios.put(apiUrl + 'blog/update', req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Post uploaded');
        } catch (error) {
            generalErrorToast();
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                    <InputText label="Heading" inputName="heading" className="w-[700px]" />
                    <InputText label="Thumbnail URL" inputName="thumbnailSlug" className="w-50" />
                    <InputText label="Author" inputName="author" className="w-50" />
                    <InputCalendar inputName="publicationDate" />
                    <InputCheckbox label="Hidden" inputName="hidden" />
                    <Button
                        className={clsx('btn-lg btn-fill-primary ml-auto h-fit', isSubmitting && 'btn-fill-primary-submitting')}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <ButtonDisabledText /> : 'Update Post'}
                    </Button>
                </div>
                <div className="grid grid-cols-[800px_700px] gap-20">
                    <InputTextarea label="Markdown" inputName="markdown" className="resize-y!" rows={20} />
                    <Markdown markdown={markdown} />
                </div>
            </form>
        </FormProvider>
    );
}
