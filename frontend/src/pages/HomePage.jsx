import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Animated background elements */}
      <div className="floating-elements">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            {['🌸', '✨', '📸', '🎈', '📝', '🎁'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="home-container">
        <header className="home-header">
          <h1>WELCOME TO GLIMSY!</h1>
          <p className="subtitle">A collection of memories </p>
        </header>

        <main className="home-main">
          <div className="memory-teaser">
            <div className="polaroid">
              <div className="polaroid-image"></div>
              <div className="polaroid-caption">Anil</div>
            </div>
            <div className="polaroid">
              <div className="polaroid-image"></div>
              <div className="polaroid-caption">Kumar</div>
            </div>
            <div className="polaroid">
              <div className="polaroid-image"></div>
              <div className="polaroid-caption">Kedarsetty</div>
            </div>
          </div>

          <div className="cta-section">
            <p>To get a glimpse of glimsy...</p>
            <Link to="/login" className="enter-button">
              click me to Enter!!!
            </Link>
          </div>
        </main>

        <footer className="home-footer">
          <p>Made with ❤️ for someone special</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;