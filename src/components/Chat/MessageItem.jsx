
import { memo } from 'react';
import { Bot, User } from 'lucide-react';


const MessageItem = memo(({ text, role }) => {
  const isBot = role === 'bot';

  const wrapperClass = isBot 
    ? 'flex items-start gap-3' 
    : 'flex items-start gap-3 flex-row-reverse';
  
  const bubbleClass = isBot 
    ? 'bg-purple-600/30 border border-purple-500/30' 
    : 'bg-blue-600/30 border border-blue-500/30';

  const Icon = isBot ? Bot : User;

  return (
    <div className={wrapperClass}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${bubbleClass}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className={`p-3 rounded-lg max-w-lg text-white ${bubbleClass}`}>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
});

export default MessageItem;