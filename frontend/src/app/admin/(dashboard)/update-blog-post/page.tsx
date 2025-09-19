import { apiUrl } from '@/environment';
import { Blog } from '@/models/blog';
import { routes } from '@/routes';
import axios from 'axios';
import Link from 'next/link';

export default async function UpdateBlogPost() {
    const blogPosts = await axios.get(apiUrl + 'blog/get-all').then((r) => r.data as Blog[]);

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
