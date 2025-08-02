const express = require('express');
const { createPost, getFeed } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getFeed);

// GET /api/posts?page=1&limit=5
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // latest first
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name');

    const total = await Post.countDocuments();
    res.json({ posts, total });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});


module.exports = router;
