import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput';
import  ChatMessages  from './components/ChatMessages.jsx';
import './App.css'

function App() {
  // Initialize as an empty array when there are no saved messages
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('messages');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading messages from localStorage:', error);
      return [];
    }
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('messages', JSON.stringify(chatMessages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }, [chatMessages]);

  return (
    <div className="app-container">

      {chatMessages.length === 0 && (
      <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below
      </p>)}
      
      <ChatMessages  
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    
    </div>
  );
}

export default App