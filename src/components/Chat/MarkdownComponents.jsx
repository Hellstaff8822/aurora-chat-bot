import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const markdownComponents = {
  h1: ({ children }) => <h1 className="mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-2 text-lg font-bold text-white md:mb-3 md:text-xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 text-base font-bold text-white md:text-lg">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 text-sm font-bold text-white md:text-base">{children}</h4>,
  p: ({ children }) => <p className="mb-3 text-sm leading-relaxed text-white md:mb-4 md:text-base">{children}</p>,
  ul: ({ children }) => <ul className="pl-4 mb-3 space-y-1 list-disc text-white md:pl-6 md:mb-4 md:space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="pl-4 mb-3 space-y-1 list-decimal text-white md:pl-6 md:mb-4 md:space-y-2">{children}</ol>,
  li: ({ children }) => <li className="text-sm leading-relaxed text-white md:text-base">{children}</li>,
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
      return (
        <code className="px-1.5 py-0.5 font-mono text-sm text-green-400 bg-gray-900 rounded">
          {codeString}
        </code>
      );
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
            }
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export default markdownComponents;
