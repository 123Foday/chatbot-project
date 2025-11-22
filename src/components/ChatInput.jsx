import dayjs from 'dayjs'
import { useState, useRef, useEffect } from 'react'
import { getAIResponse } from '../services/aiService';
import { typeText } from '../utils/typingEffect';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const typingStopRef = useRef(null);

  function saveInputText(event) {
    setInputText(event.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }

  useEffect(() => {
    // Reset textarea height when input is cleared
    if (textareaRef.current && !inputText) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Cleanup typing effect on unmount
    return () => {
      if (typingStopRef.current) {
        typingStopRef.current();
      }
    };
  }, [inputText]);

async function sendMessage() {

    if (isLoading || inputText === '') {
      return;
    }

    const userMessage = inputText.trim();
    if (!userMessage) {
      return;
    }

    // Set isLoading to true at the start
    setIsLoading(true);

    // Add user message immediately
    const userMessageObj = {
      message: userMessage,
      sender: 'user',
      id: crypto.randomUUID(),
      time: dayjs().valueOf()
    };

    const newChatMessages = [
      ...chatMessages,
      userMessageObj,
      // Add loading spinner message
      {
        message: <img
        className="loading-spinner" 
        src={LoadingSpinner} />,
        sender: 'robot',
        id: crypto.randomUUID(), 
      }
    ];

    setInputText('');
    setChatMessages(newChatMessages);

    try {
      // Get AI response with chat history for context
      const response = await getAIResponse(userMessage, chatMessages);
      
      // Create a unique ID for the robot message
      const robotMessageId = crypto.randomUUID();
      
      // Replace loading spinner with empty message that will be typed
      setChatMessages([
        ...chatMessages,
        userMessageObj,
        {
          message: '',
          sender: 'robot',
          time: dayjs().valueOf(),
          id: robotMessageId,
          isTyping: true
        }
      ]);

      // Start typing effect
      typingStopRef.current = typeText(response, (typedText) => {
        setChatMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === robotMessageId 
              ? { ...msg, message: typedText, isTyping: typedText.length < response.length }
              : msg
          )
        );
      }, 15); // 15ms per character for smooth typing
    } catch (error) {
      // Handle errors gracefully
      const errorMessage = error.message || 'Failed to get response. Please check your API key and try again.';
      
      setChatMessages([
        ...chatMessages,
        userMessageObj,
        {
          message: `Error: ${errorMessage}`,
          sender: 'robot',
          time: dayjs().valueOf(),
          id: crypto.randomUUID(),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }

  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
    // Allow Shift+Enter for new lines
  }

  function clearMessage() {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify([]));
  }

  return (
    <div className="chat-input-container">
      <textarea
        ref={textareaRef}
        placeholder="Type a message..." 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
        rows={1}
        disabled={isLoading}
      />
      <button
        onClick={sendMessage}
        className="send-button"
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? '...' : 'Send'}
      </button>
      <button
        onClick={clearMessage}
        className="clear-button"
        disabled={isLoading}
      >
        Clear
      </button>
    </div>
  );
}