import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const markdownComponents = {
  h1: ({ children }) => <h1 className="mb-4 text-2xl font-bold text-white">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 text-xl font-bold text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 text-lg font-bold text-white">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 text-base font-bold text-white">{children}</h4>,
  p: ({ children }) => <p className="leading-relaxed text-white">{children}</p>,
  ul: ({ children }) => <ul className="pl-6 mb-4 space-y-2 list-disc text-white">{children}</ul>,
  ol: ({ children }) => <ol className="pl-6 mb-4 space-y-2 list-decimal text-white">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed text-white">{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-white">{children}</em>,
  hr: () => <hr className="my-4 border-t border-gray-600 md:my-6" />,
  pre: ({ children }) => <>{children}</>,
  code({ inline, className, children }) {
    const match = /language-(\w+)/.exec(className || '');
    const codeString = Array.isArray(children) ? children.join('') : String(children);

    if (inline && !className) {
      return <span className="text-white">{codeString}</span>;
    }

    if (inline) {
      return <code className="px-1.5 py-0.5 font-mono text-sm text-green-400 bg-gray-900 rounded">{codeString}</code>;
    }

    return (
      <div className="overflow-hidden my-4 bg-gray-900 rounded-lg border border-gray-600">
        <SyntaxHighlighter
          style={oneDark}
          language={match ? match[1] : 'text'}
          PreTag="div"
          customStyle={{
            background: 'transparent',
            margin: 0,
            fontSize: 14,
            padding: '1rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={false}
          codeTagProps={{
            style: {
              background: 'transparent',
            },
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export default markdownComponents;
