import Author from '@/components/blog/author';
import { Markdown } from '@/components/markdown';
import { apiUrl } from '@/environment';
import axios from 'axios';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogPost = await axios.get(apiUrl + `blog/get/${slug}`).then((r) => r.data as Blog);

    return (
        <div className="container-sm pb-container-sm-vert pt-14">
            <div className="mx-auto max-w-[700px]">
                <h3>{blogPost.heading}</h3>
                <Author blog={blogPost} />
            </div>
            <Markdown markdown={blogPost.markdown} />
        </div>
    );
}
