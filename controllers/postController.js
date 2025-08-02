const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.create({
      content,
      author: req.user
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
