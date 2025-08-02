const express = require('express');
const { createPost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const router = express.Router();

// Create Post
router.post('/', protect, createPost);

// Get Posts with Pagination (latest first)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name');

    const total = await Post.countDocuments();
    res.json({ posts, total });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Like/Unlike Post
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ liked: !isLiked, totalLikes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle like' });
  }
});

module.exports = router;
