import ReactMarkdown from 'react-markdown';

type markdownProps = {
    markdown: string;
};

export const Markdown: React.FC<markdownProps> = ({ markdown }) => {
    return (
        <div className="blog-post mx-auto max-w-[700px]">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};
