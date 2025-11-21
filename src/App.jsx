import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import  ChatMessages  from './components/ChatMessages.jsx';
import './App.css'




function App() {

  // Initialize as an empty array when there are no saved messages
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  //const [chatMessages, setChatMessages] = array;
  //const chatMessages = array[0];
  //const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
      "Hi": "Yes dear, how can I help you today?",
      "What do you like?": "I like to assist the users of this app.",
      "What is your favorite color?": "I like all colors equally.",
      "What is your favorite food?": "I don't eat, but I hear that humans like pizza.",
      "What is the meaning of life?": "42",
      "What is your favorite movie?": "I don't watch movies, but I hear that Inception is a good one.",
      "What is your favorite book?": "I don't read books, but I hear that The Hitchhiker's Guide to the Galaxy is a good one.",
      "What is your favorite music?": "I don't listen to music, but I hear that classical music is very relaxing.",
      "Tell me a joke.": "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "What is the weather like today?": "I don't have access to real-time weather data, but you can check a weather website or app for the latest information.",
      "How are you?": "I'm just a computer program, so I don't have feelings, but thanks for asking!",
      "What is your name?": "I am a chatbot created by SuperSimpleDev.",
      "Who created you?": "I was created by SuperSimpleDev.",
      "do you code?": "Yes, I can help with coding questions and provide code examples.",
      "What programming languages do you know?": "I am familiar with many programming languages, including JavaScript, Python, Java, C++, and more.",
      "goodbye": "Goodbye! Have a great day!",
      "bye": "Goodbye! Take care!",
      "see you later": "See you later! Looking forward to our next chat!",
    });
  }, []);
  
    useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">

      {chatMessages.length === 0 && (
      <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below
      </p>)}
      
      <ChatMessages  
        chatMessages={chatMessages}
      />
    
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    
    </div>
  );
}

export default App