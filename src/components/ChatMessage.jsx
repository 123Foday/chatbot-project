import dayjs from 'dayjs';
import { useState, useRef, useEffect } from 'react';
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/unimak.jpg';
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

  // Format message text - preserve line breaks and parse markdown bold (**text**)
  function formatMessage(msg) {
    if (typeof msg !== 'string') return msg;
    if (msg === '') return null; // Return null for empty messages (will show cursor)
    
    // Split by newlines and create paragraphs
    const lines = msg.split('\n');
    return lines.map((line, lineIndex) => {
      if (!line) return <span key={lineIndex}>{'\u00A0'}</span>;
      
      // Parse bold markdown (**text**)
      const parts = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.+?)\*\*/g;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before the bold section
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add the bold text (without the asterisks)
        parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after the last bold section
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      // If no bold sections were found, return the line as-is
      if (parts.length === 0) {
        parts.push(line);
      }
      
      return (
        <span key={lineIndex}>
          {parts}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
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