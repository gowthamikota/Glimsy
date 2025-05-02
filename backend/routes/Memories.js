const express = require("express");
const router = express.Router();
const Memory = require("../models/Memory");
const upload = require("../middleware/upload");

const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// POST /api/memories - Upload a new memory
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { memory } = req.body; // Text content of the memory
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Uploaded image path

    // Create a new memory document
    const newMemory = new Memory({
      text: memory,
      image: imagePath,
    });

    await newMemory.save(); // Save to MongoDB
    res.status(201).json(newMemory); // Respond with the created memory
  } catch (error) {
    console.error('Error uploading memory:', error);
    res.status(500).json({ message: 'Failed to upload memory' });
  }
});

// GET /api/memories - Fetch all memories
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 }); // Fetch memories sorted by creation date
    res.status(200).json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    res.status(500).json({ message: 'Failed to fetch memories' });
  }
});

module.exports = router;