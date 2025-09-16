import Author from '@/components/blog/author';
import { apiUrl } from '@/environment';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default async function Blog() {
    const blogPosts = await axios.get(apiUrl + 'blog/get-all').then((r) => r.data as Blog[]);
    const imgSrc =
        'https://images.unsplash.com/photo-1757252800867-2e78e08a6d53?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <div className="container-sm py-container-sm-vert">
            <div className="grid grid-cols-3 gap-4">
                {blogPosts.map((blogPost) => (
                    <Link key={blogPost.id} href={'blog/' + blogPost.slug} className="flex flex-col">
                        <div className="relative mb-4 aspect-12/8 overflow-hidden rounded-lg">
                            <Image src={imgSrc} alt="Thumbnail" fill className="object-cover" />
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
