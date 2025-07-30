import { memo } from 'react';
import { User } from 'lucide-react';
import BotAvatar from '../../assets/aurora128_enhanced.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import markdownComponents from './MarkdownComponents';

const MessageItem = memo(({ text, role }) => {
  const isBot = role === 'bot';

  const wrapperClass = isBot ? 'flex items-start gap-3' : 'flex items-start gap-3 flex-row-reverse mb-7 mt-7';
  const userBubbleClass = 'bg-blue-600/30 border border-blue-500/30';
  const botBubbleClass = 'bg-purple-600/30 border border-purple-500/30';

  return (
    <div className={wrapperClass}>
      {isBot ? (
        <div className={`flex-shrink-0 p-1 w-8 h-8 rounded-full ${botBubbleClass}`}>
          <img src={BotAvatar} alt="Bot Avatar" className="object-cover w-full h-full rounded-full" />
        </div>
      ) : (
        <div className={`flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-full ${userBubbleClass}`}>
          <User className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`p-4 rounded-lg max-w-2xl text-white ${isBot ? botBubbleClass : userBubbleClass}`}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
});

export default MessageItem;
