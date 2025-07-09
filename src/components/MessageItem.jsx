function MessageItem({ text, role }) {
    const isUser = role === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`
            ${isUser ? 'bg-blue-600' : 'bg-purple-600'}
            text-white rounded-lg px-4 py-3 max-w-[80%] mb-4
          `}
        >
          {text}
        </div>
      </div>
    );
  }
  
  export default MessageItem;