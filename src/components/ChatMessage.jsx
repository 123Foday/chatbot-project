import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react';
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time, isError, id, onEdit, chatMessages, setChatMessages, isEdited, isTyping }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(typeof message === 'string' ? message : '');
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  function handleEdit() {
    if (sender === 'user') {
      setIsEditing(true);
      setEditText(typeof message === 'string' ? message : '');
    }
  }

  function handleSaveEdit() {
    if (editText.trim() && onEdit) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditText(typeof message === 'string' ? message : '');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSaveEdit();
    } else if (event.key === 'Escape') {
      handleCancelEdit();
    }
  }

  // Format message text - preserve line breaks and basic formatting
  function formatMessage(msg) {
    if (typeof msg !== 'string') return msg;
    if (msg === '') return null; // Return null for empty messages (will show cursor)
    
    // Split by newlines and create paragraphs
    const lines = msg.split('\n');
    return lines.map((line, index) => (
      <span key={index}>
        {line || '\u00A0'}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  }

  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'}>

      {sender === 'robot' && (
        <img src={RobotProfileImage} 
        className="chat-message-profile" 
        alt="AI Assistant" />
      )}
      
      <div className="chat-message-wrapper">
        {isEditing ? (
          <div className="chat-message-edit-container">
            <textarea
              ref={editInputRef}
              className="chat-message-edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={Math.min(editText.split('\n').length, 6)}
            />
            <div className="chat-message-edit-actions">
              <button 
                className="chat-message-edit-save"
                onClick={handleSaveEdit}
                title="Save (Enter)"
              >
                ✓
              </button>
              <button 
                className="chat-message-edit-cancel"
                onClick={handleCancelEdit}
                title="Cancel (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={`chat-message-text ${isError ? 'error' : sender === 'user' ? 'user' : 'robot'}`}>
              {formatMessage(message)}
              {isTyping && <span className="typing-cursor">|</span>}
              {time && !isTyping && (
                <div className="chat-message-time">
                  {dayjs(time).format('h:mma')}
                  {isEdited && <span className="chat-message-edited"> (edited)</span>}
                </div>
              )}
            </div>
            {sender === 'user' && !isError && (
              <button 
                className="chat-message-edit-button"
                onClick={handleEdit}
                title="Edit message"
                aria-label="Edit message"
              >
                ✎
              </button>
            )}
          </>
        )}
      </div>
      
      {sender === 'user' && (
        <img src={UserProfileImage} 
        className="chat-message-profile" 
        alt="You" />
      )}
    </div>
  );
}