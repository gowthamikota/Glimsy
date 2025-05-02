import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [hearts, setHearts] = useState([]);
  const navigate = useNavigate();

  // List of valid nicknames (replace with your actual nicknames)
  const validNicknames = ['buddy', 'champ', 'sparky', 'tiger', 'sunshine'];

  useEffect(() => {
    const colors = ['#ff6b6b', '#4a6fa5', '#ffb347', '#7bc043', '#6d8bc3'];
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(newHearts);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Trim and lowercase the nickname for case-insensitive comparison
    const trimmedNickname = nickname.trim().toLowerCase();

    if (!trimmedNickname) {
      setError('Please enter a nickname');
      return;
    }

    if (validNicknames.includes(trimmedNickname)) {
      // Successful login - redirect to main page
      navigate('/dashboard'); // Change this to your main page route
    } else {
      setError('That nickname doesn\'t match our memories. Try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}vw`,
              top: `${heart.top}vh`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              color: heart.color,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      <div className="login-container">
        <h1>Until We Meet Again</h1>
        <div className="message">
          This city won't be the same without you.<br />
          Before you go, let's take one more trip down memory lane.
        </div>

        <div className="nickname-prompt">
          "To enter, recall the first nickname I gave you..."
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter that special nickname..."
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">
            Continue the Journey
          </button>
        </form>

        <div className="memories">
          Distance means so little when someone means so much.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;