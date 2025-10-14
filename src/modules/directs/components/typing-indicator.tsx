const TypingIndicator = ({ typingUsers }: { typingUsers: Set<string> }) => {
  if (typingUsers.size === 0) return null;

  return (
    <div className='flex items-center gap-2 px-4 py-2 text-sm text-gray-400'>
      <span>
        {typingUsers.size === 1
          ? 'Someone is typing...'
          : `${typingUsers.size} people are typing...`}
      </span>
    </div>
  );
};

export default TypingIndicator;
