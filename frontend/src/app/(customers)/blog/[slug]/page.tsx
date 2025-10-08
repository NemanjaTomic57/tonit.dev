import Author from '@/components/blog/author';
import { Markdown } from '@/components/markdown';
import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import axios from 'axios';
import Image from 'next/image';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogPost = await axios.get(apiUrl + `blog/get/${slug}`).then((r) => r.data as Blog);

    return (
        <div className="pb-container-sm-vert container pt-3 sm:pt-14">
            <div className="mx-auto max-w-[700px]">
                <h1 className="blog-post__heading mb-4!">{blogPost.heading}</h1>
                <Author blog={blogPost} />
            </div>
            <div className="relative mx-auto my-4 aspect-3/2 max-h-[600px] overflow-hidden rounded-xl sm:my-8">
                <Image src={blogPost.thumbnailSlug} alt="Thumbnail" fill className="object-cover" />
            </div>
            <Markdown markdown={blogPost.markdown} />
        </div>
    );
}
