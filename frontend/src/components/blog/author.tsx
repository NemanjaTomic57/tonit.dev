import { Blog } from '@/models/blog';
import { readingTimeMinutes, formatDateToLocale } from '@/utils/dateTime';

interface Props {
    blog: Blog;
}

export default function Author({ blog }: Props) {
    return (
        <div className="flex items-center">
            <div>
                <p className="mb-0! font-bold">{blog.author}</p>
                <p className="text-gray-shade">
                    {formatDateToLocale(blog.publicationDate)} <span className="mx-2">•</span> {readingTimeMinutes(blog.markdown)} min read
                </p>
            </div>
        </div>
    );
}
