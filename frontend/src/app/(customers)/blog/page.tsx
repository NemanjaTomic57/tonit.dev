import Author from '@/components/blog/author';
import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage() {
    const blogPosts = await axios.get(apiUrl + 'blog/get-all').then((r) => r.data as Blog[]);

    return (
        <div className="container-sm py-container-sm-vert">
            <div className="grid grid-cols-3 gap-4">
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
