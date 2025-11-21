import dayjs from 'dayjs'
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

async function sendMessage() {

    if (isLoading || inputText === '') {
      return;
    }

    // Set isLoading to true at the start, and set it to
    // false after everything is done.
    setIsLoading(true);
    


    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },

      // Another solution is to add the Loading... message
      // to newChatMessages, but we have to remove it later.
      {
        message: <img
        className="loading-spinner" 
        src={LoadingSpinner} />,
        sender: 'robot',
        id: crypto.randomUUID(), 
      }
    ];

      // Set isLoading to false after everything is done.
    setIsLoading(false);

    setInputText('');

    setChatMessages(newChatMessages);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      
      // This makes a copy of newChatMessages, but without the
    // last message in the array.
    ...newChatMessages.slice(0, newChatMessages.length - 1),
      {
        message: response,
        sender: 'robot',
        time: dayjs().valueOf(),
        id: crypto.randomUUID()
      }
      
    ]);

  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  function clearMessage() {
    setChatMessages([]);
    localStorage.setItem('chatMessages', JSON.stringify([]));
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" size="30" 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessage}
        className="clear-button"
      >Clear</button>
    </div>
  );
}