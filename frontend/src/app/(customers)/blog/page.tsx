import Author from '@/components/blog/author';
import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage() {
    const res = await fetch(apiUrl + 'blog/get-all', {
        cache: 'no-store',
    });

    const blogPosts: Blog[] = await res.json();

    return (
        <div className="container-sm py-container-sm-vert">
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((blogPost) => (
                    <Link key={blogPost.id} href={'blog/' + blogPost.slug} className="flex flex-col">
                        <div className="relative mb-4 aspect-12/8 overflow-hidden rounded-lg">
                            <Image src={blogPost.thumbnailSlug} alt="Thumbnail" fill className="object-cover" />
                        </div>
                        <h5>{blogPost.heading}</h5>
                        <div className="mt-auto">
                            <Author blog={blogPost} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
