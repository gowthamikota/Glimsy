import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FriendDashboard.css';

const FriendDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [newMemories, setNewMemories] = useState(0);
  const [friendName] = useState(location.state?.name || "Friend");
  const [floatingElements, setFloatingElements] = useState([]);

  // Create floating elements
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 10 + Math.random() * 25,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      emoji: ['✨', '🌟', '🎈', '❤️', '🫂', '🏠'][Math.floor(Math.random() * 6)]
    }));
    setFloatingElements(elements);
  }, []);

  // Countdown to return date
  useEffect(() => {
    const returnDate = new Date('2024-12-31');
    const today = new Date();
    const diffTime = returnDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
    
    // Simulate fetching unread data
    setUnreadMessages(3);
    setNewMemories(2);
  }, []);
  const features = [
    {
      id: 'countdown',
      title: 'Homecoming Countdown',
      icon: '⏳',
      description: `See how many days until ${friendName} returns`,
      color: '#4a6fa5'
    },
    {
      id: 'memories',
      title: 'Memory Gallery',
      icon: '📸',
      description: `View and download ${friendName}'s special moments`,
      color: '#e67e22'
    },
    {
      id: 'messages',
      title: 'Daily Surprises',
      icon: '🎁',
      description: `${friendName}'s personalized messages`,
      color: '#27ae60',
      badge: unreadMessages
    },
    
  ];

  const handleFeatureClick = (featureId) => {
    navigate(`/${featureId}`, { state: { name: friendName } });
  };

  return (
    <div className="dashboard-page">
      {/* Floating background elements */}
      <div className="floating-elements">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="floating-element"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              fontSize: `${element.size}px`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="dashboard-container">
        <header className="dashboard-header" data-aos="fade-down">
          <h1>Welcome to <span className="friend-name">{friendName}'s</span> Space</h1>
          <p className="subtitle">Everything here is just for you, {friendName.split(' ')[0]}!</p>
          
          {daysLeft > 0 && (
            <div className="countdown-banner" data-aos="zoom-in">
              <span className="countdown-number">{daysLeft}</span> days until {friendName.split(' ')[0]} returns
            </div>
          )}
        </header>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="feature-card"
              onClick={() => handleFeatureClick(feature.id)}
              style={{ '--card-color': feature.color }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.badge && feature.badge > 0 && (
                <span className="notification-badge">{feature.badge}</span>
              )}
            </div>
          ))}
        </div>

        

        <div className="special-note" data-aos="fade-in">
          <p>This entire space is dedicated to you, {friendName.split(' ')[0]}. Every feature, memory, 
          and message is here to remind you how special you are, even while you're away.</p>
        </div>
      </div>
    </div>
  );
};

export default FriendDashboard;










