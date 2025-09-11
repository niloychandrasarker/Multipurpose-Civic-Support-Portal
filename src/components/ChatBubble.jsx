const ChatBubble = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
