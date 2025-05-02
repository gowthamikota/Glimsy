const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or file path to the uploaded image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Memory', MemorySchema);