import Author from '@/components/blog/author';
import { Markdown } from '@/components/markdown';
import { apiUrl } from '@/environment';
import axios from 'axios';
import Image from 'next/image';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogPost = await axios.get(apiUrl + `blog/get/${slug}`).then((r) => r.data as Blog);
    const imgSrc =
        'https://images.unsplash.com/photo-1757252800867-2e78e08a6d53?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <div className="container-sm pb-container-sm-vert pt-14">
            <div className="mx-auto max-w-[700px]">
                <h3 className="mb-4!">{blogPost.heading}</h3>
                <Author blog={blogPost} />
            </div>
            <div className="relative my-8 h-[600px] w-full overflow-hidden rounded-xl">
                <Image src={imgSrc} alt="Thumbnail" fill className="object-cover" />
            </div>
            <Markdown markdown={blogPost.markdown} />
        </div>
    );
}
