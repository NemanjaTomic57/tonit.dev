import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import { routes } from '@/routes';
import Link from 'next/link';

export default async function UpdateBlogPost() {
    const res = await fetch(apiUrl + 'blog/get-all', {
        cache: 'no-store',
    });
    const blogPosts: Blog[] = await res.json();

    return (
        <table className="h-fit">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Publication Date</th>
                    <th>Hidden</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {blogPosts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.heading}</td>
                        <td>{new Date(post.publicationDate).toLocaleDateString()}</td>
                        <td>{post.hidden ? 'Yes' : 'No'}</td>
                        <td>
                            <Link href={routes.updateBlogPost + '/' + post.slug} className="link">
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
