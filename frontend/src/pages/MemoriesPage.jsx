import React, { useState, useEffect } from 'react';
import MemoryForm from '../components/MemoryForm';
import MemoryList from '../components/MemoryList';
import './MemoriesPage.css';

const MemoriesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
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
      emoji: ['📸', '🌟', '🎞️', '❤️', '🖼️', '✨'][Math.floor(Math.random() * 6)]
    }));
    setFloatingElements(elements);
  }, []);

  const handleMemoryUploaded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="memories-page">
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
      <div className="memories-container">
        <header className="memories-header" data-aos="fade-down">
          <h1>Your Special Memories</h1>
          <p className="subtitle">Relive your favorite moments</p>
        </header>

        <div className="memory-upload-section" data-aos="fade-up">
          <h2><span className="icon">🖼️</span> Add New Memory</h2>
          <br></br>
          <MemoryForm onUploadSuccess={handleMemoryUploaded} />
        </div>

        <div className="memory-gallery-section" data-aos="fade-in">
          <h2><span className="icon">📸</span> Memory Gallery</h2>
          <MemoryList key={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;