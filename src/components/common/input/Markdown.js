import ReactMarkdown from 'react-markdown';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

export const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, remarkParse, remarkRehype, rehypeStringify]]}
    >
      {children}
    </ReactMarkdown>
  );
};
