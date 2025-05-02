import React, { useState } from 'react';
import './MemoryForm.css';

const MemoryForm = ({ onUploadSuccess }) => {
  const [memory, setMemory] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('memory', memory);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/memories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onUploadSuccess();
        setMemory('');
        setImage(null);
      } else {
        console.error('Failed to upload memory');
      }
    } catch (error) {
      console.error('Error uploading memory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="memory-form-container" data-aos="fade-up">
      <form onSubmit={handleSubmit} className="memory-form">
        <div className="form-group">
          <label htmlFor="memory">Share Your Memory</label>
          <textarea
            id="memory"
            className="form-control"
            placeholder="Write your special memory here..."
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="file-upload-label">
            <span className="upload-icon">📷</span>
            {image ? image.name : 'Add a photo (optional)'}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input"
          />
          {image && (
            <button 
              type="button" 
              className="clear-image-btn"
              onClick={() => setImage(null)}
            >
              ✕ Remove
            </button>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner">⏳</span>
          ) : (
            'Upload Memory ✨'
          )}
        </button>
      </form>
    </div>
  );
};

export default MemoryForm;