import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryList.css';

const MemoryList = () => {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/memories');
        if (response.ok) {
          const data = await response.json();
          setMemories(data);
        } else {
          console.error('Failed to fetch memories');
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const handleCardClick = (memory) => {
    setSelectedMemory(memory);
  };

  const closeExpandedView = () => {
    setSelectedMemory(null);
  };

  if (loading) {
    return (
      <div className="memory-gallery">
        <div className="loading">Loading memories...</div>
        <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="memory-gallery">
        <div className="no-memories">No memories yet. Add your first memory!</div>
        <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="memory-gallery">
      {/* Back to Dashboard Button */}
      <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      {/* Expanded Memory View */}
      {selectedMemory && (
        <div className="memory-expanded" onClick={closeExpandedView}>
          <div className="expanded-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeExpandedView}>×</button>
            <h3>{new Date(selectedMemory.createdAt).toLocaleDateString()}</h3>
            {selectedMemory.image && (
              <div className="expanded-image">
                <img 
                  src={`http://localhost:5000${selectedMemory.image}`} 
                  alt="Memory" 
                />
              </div>
            )}
            <div className="expanded-text">
              <p>{selectedMemory.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Memory Cards Grid */}
      <div className="memory-grid">
        {memories.map((memory) => (
          <div 
            key={memory._id} 
            className="memory-card"
            onClick={() => handleCardClick(memory)}
            data-aos="fade-up"
          >
            {memory.image && (
              <div className="memory-image">
                <img 
                  src={`https://glimsy.onrender.com${memory.image}`} 
                  alt="Memory preview" 
                />
              </div>
            )}
            <div className="memory-preview">
              <p>{memory.text.length > 100 
                ? `${memory.text.substring(0, 100)}...` 
                : memory.text}
              </p>
            </div>
            <div className="memory-date">
              {new Date(memory.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryList;