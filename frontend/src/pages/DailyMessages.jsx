import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyMessages.css';
import api from '../services/api';

const DailyMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        setMessages(response.data);
        
        // Calculate current day (should match backend logic)
        const startDate = new Date('2023-01-01');
        const today = new Date();
        const diffTime = today - startDate;
        setCurrentDay(Math.min(Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1, 30));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleViewMessage = (message) => {
    if (message.isUnlocked) {
      setSelectedMessage(message);
    }
  };

  return (
    <div className="messages-page">
      <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <h1>Daily Messages for You</h1>
      <p className="subtitle">
        {currentDay > 30 
          ? "You've unlocked all 30 messages!" 
          : `Day ${currentDay} of 30 - ${30 - currentDay} messages remaining`}
      </p>

      <div className="messages-grid">
        {messages.map((message) => (
          <div 
            key={message._id}
            className={`message-card ${message.isUnlocked ? 'unlocked' : 'locked'}`}
            onClick={() => handleViewMessage(message)}
          >
            <div className="message-day">Day {message.day}</div>
            {message.isUnlocked ? (
              <div className="message-content">
                <div className="emoji">✉️</div>
                <button className="view-btn">View Message</button>
              </div>
            ) : (
              <div className="message-locked">
                <div className="lock-icon">🔒</div>
                <p>Unlocks on day {message.day}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="message-modal" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMessage(null)}>×</button>
            <h2>Day {selectedMessage.day}</h2>
            <div className="message-text">
              <p>{selectedMessage.content}</p>
            </div>
            <div className="message-date">
              {new Date(selectedMessage.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyMessages;