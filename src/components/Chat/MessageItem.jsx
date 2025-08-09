import { memo } from 'react';
import { User } from 'lucide-react';
import BotAvatar from '../../assets/aurora128_enhanced.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import markdownComponents from './MarkdownComponents';

const MessageItem = memo(({ text, role }) => {
  const isBot = role === 'bot';

  const wrapperClass = isBot ? 'flex items-start gap-2 md:gap-3 mb-6 md:mb-8' : 'flex items-start gap-2 md:gap-3 flex-row-reverse mb-6 md:mb-8';
  const userBubbleClass = 'bg-blue-600/30 border border-blue-500/30';
  const botBubbleClass = 'bg-purple-600/30 border border-purple-500/30';

  return (
    <div className={wrapperClass}>
      {isBot ? (
        <div className={`flex-shrink-0 p-1 w-7 h-7 rounded-full md:w-8 md:h-8 ${botBubbleClass}`}>
          <img src={BotAvatar} alt="Bot Avatar" className="object-cover w-full h-full rounded-full" />
        </div>
      ) : (
        <div className={`flex flex-shrink-0 justify-center items-center w-7 h-7 rounded-full md:w-8 md:h-8 ${userBubbleClass}`}>
          <User className="w-4 h-4 text-white md:w-5 md:h-5" />
        </div>
      )}

      <div className={`p-3 md:p-4 rounded-lg max-w-[85%] md:max-w-2xl text-white ${isBot ? botBubbleClass : userBubbleClass}`}>
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
