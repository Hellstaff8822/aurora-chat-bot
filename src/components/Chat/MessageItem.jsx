import { memo } from 'react';
import { User } from 'lucide-react';
import BotAvatar from '../../assets/aurora128_enhanced.png';

const MessageItem = memo(({ text, role }) => {
  const isBot = role === 'bot';

  const wrapperClass = isBot ? 'flex items-start gap-3' : 'flex items-start gap-3 flex-row-reverse mb-7';

  const userBubbleClass = 'bg-blue-600/30 border border-blue-500/30';
  const botBubbleClass = 'bg-purple-600/30 border border-purple-500/30';

  return (
    <div className={wrapperClass}>
      {isBot ? (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${botBubbleClass} p-1`}>
          <img src={BotAvatar} alt="Bot Avatar" className="w-full h-full rounded-full object-cover" />
        </div>
      ) : (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${userBubbleClass}`}>
          <User className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`p-3 rounded-lg max-w-lg text-white ${isBot ? botBubbleClass : userBubbleClass}`}>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
});

export default MessageItem;
