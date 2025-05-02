import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CountDownPage.css';

const CountdownPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [floatingElements, setFloatingElements] = useState([]);
  const [friendName] = useState(location.state?.name || "Friend");

  // Set return date (YYYY-MM-DD format)
  const returnDate = new Date('2025-06-03T18:00:00');

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

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = returnDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Celebration mode when countdown completes
  if (timeLeft.days <= 0 && timeLeft.hours <= 0 && 
      timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    return (
      <div className="celebration-screen">
        <div className="celebration-content">
          <h1>🎉 BOW! 🎉</h1>
          <p>let me tell u the num of days left</p>
          {/* <button 
            className="dashboard-button"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button> */}
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-page">
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
      <div className="countdown-container">
        <button 
          className="dashboard-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
        
        <header className="countdown-header">
          <h1>Counting Down Until {friendName}'s Return</h1>
          <p className="subtitle">Every second brings us closer to having you back!</p>
        </header>

        <main className="countdown-display">
          <div className="countdown-segment" data-aos="fade-up">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-segment" data-aos="fade-up" data-aos-delay="100">
            <span className="countdown-number">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-segment" data-aos="fade-up" data-aos-delay="200">
            <span className="countdown-number">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-segment" data-aos="fade-up" data-aos-delay="300">
            <span className="countdown-number">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </main>

        <div className="encouragement-section" data-aos="fade-in">
          <p>If you feel like coming back or missing home just remind yourself that</p>
          <ul className="reunion-ideas">
            <li>You're growing in ways you never imagined</li>
            <li>Every challenge is shaping you into something stronger</li>
            <li>The experiences you're gaining now will be your best stories later</li>
            <li>Home will always be there, but this journey is once in a lifetime</li>
          </ul>
        </div>

        <div className="progress-container" data-aos="fade-in">
          <div 
            className="progress-bar"
            style={{ 
              width: `${100 - (timeLeft.days / 365 * 100)}%`,
              backgroundColor: `hsl(${100 - (timeLeft.days / 365 * 100)}, 70%, 50%)`
            }}
          ></div>
          <span className="progress-text">
            {Math.round(100 - (timeLeft.days / 365 * 100))}% of your time away completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;