function MessageItem({ text, role }) {
    const isUser = role === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`
            ${isUser ? 'bg-blue-600' : 'bg-purple-600'}
            text-white rounded-lg px-4 py-2 max-w-[80%] mb-2
          `}
        >
          {text}
        </div>
      </div>
    );
  }
  
  export default MessageItem;