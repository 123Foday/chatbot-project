import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';


function ChatMessages({chatMessages, setChatMessages}) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  function handleEditMessage(messageId, newText) {
    setChatMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, message: newText, time: Date.now(), isEdited: true }
          : msg
      )
    );
  }

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
            isError={chatMessage && chatMessage.isError}
            id={chatMessage && chatMessage.id}
            isEdited={chatMessage && chatMessage.isEdited}
            isTyping={chatMessage && chatMessage.isTyping}
            onEdit={handleEditMessage}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
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