const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String }, // Optional: reference to the author
  category: { type: String, enum: ["Finance", "Travel", "Lifestyle", "Entertainment", "Food & Drink", "Science", "Environment", "Personal Finance"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
