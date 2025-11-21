import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';


function ChatMessages({chatMessages}) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container" 
    ref={chatMessagesRef}>
      {chatMessages.map((chatMessage, index) => {
        const key = chatMessage && chatMessage.id ? chatMessage.id : index;
        return (
          <ChatMessage
            message={chatMessage && chatMessage.message}
            sender={chatMessage && chatMessage.sender}
            time={chatMessage && chatMessage.time}
            key={key}
          />
        );
      })}
    </div>
  );
}
export default ChatMessages

function useAutoScroll (dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }

  }, [dependencies]);

  return containerRef;
}