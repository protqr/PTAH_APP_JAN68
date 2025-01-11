const mongoose = require('mongoose');
const postModel = require('../models/postModel');
const User = require('../models/userModel');

// Create Post
const createPostController = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    if (!title || !content || !tag) {
      return res.status(400).send({ success: false, message: "Please provide all fields" });
    }

    const post = await postModel.create({
      title,
      content,
      tag,
      postedBy: req.auth._id,
    });

    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error in create post:", error);
    res.status(500).send({
      success: false,
      message: "Error in create post API",
      error,
    });
  }
};

// Get All Posts
const getAllpostController = async (req, res) => {
  try {
    const posts = await postModel.find().populate('postedBy', 'name').sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All posts retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error in get all posts:", error);
    res.status(500).send({
      success: false,
      message: "Error in get all posts API",
      error,
    });
  }
};

// Get User Posts
const getUserPostsController = async (req, res) => {
  try {
    const posts = await postModel.find({ postedBy: req.auth._id }).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "User posts retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error in get user posts:", error);
    res.status(500).send({
      success: false,
      message: "Error in get user posts API",
      error,
    });
  }
};

// Delete Post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ success: false, message: "Invalid post ID" });
    }

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send({ success: false, message: "Post not found" });
    }

    if (post.postedBy.toString() !== req.auth._id) {
      return res.status(403).send({ success: false, message: "Unauthorized action" });
    }

    await post.remove();

    res.status(200).send({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in delete post:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete post API",
      error,
    });
  }
};

// Update Post
const updatePostController = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const { id } = req.params;

    if (!title || !content || !tag) {
      return res.status(400).send({ success: false, message: "Please provide all fields" });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { title, content, tag },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ success: false, message: "Post not found" });
    }

    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error("Error in update post:", error);
    res.status(500).send({
      success: false,
      message: "Error in update post API",
      error,
    });
  }
};

// Add Comment
const addCommentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text.trim()) {
      return res.status(400).send({ success: false, message: "Comment text is required" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({ success: false, message: "Post not found" });
    }

    post.comments.push({
      text,
      postedBy: req.auth._id,
      created: Date.now(),
    });

    await post.save();

    res.status(200).send({
      success: true,
      message: "Comment added successfully",
      post,
    });
  } catch (error) {
    console.error("Error in add comment:", error);
    res.status(500).send({
      success: false,
      message: "Error in add comment API",
      error,
    });
  }
};

// Delete Comment
const deleteCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({ success: false, message: "Post not found" });
    }

    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).send({ success: false, message: "Comment not found" });
    }

    if (comment.postedBy.toString() !== req.auth._id) {
      return res.status(403).send({ success: false, message: "Unauthorized action" });
    }

    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
    await post.save();

    res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
      post,
    });
  } catch (error) {
    console.error("Error in delete comment:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete comment API",
      error,
    });
  }
};

// Add Reply
const addReplyController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'ต้องกรอกข้อความการตอบกลับ' });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'ไม่พบโพสต์' });
    }

    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'ไม่พบความคิดเห็น' });
    }

    comment.replies.push({
      text,
      postedBy: req.auth._id,
      created: Date.now(),
    });

    await post.save();
    res.status(200).json({ success: true, message: 'เพิ่มการตอบกลับสำเร็จ', post });
  } catch (error) {
    console.error('Error in addReplyController:', error.message);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์', error: error.message });
  }
};





module.exports = {
  createPostController,
  getAllpostController,
  getUserPostsController,
  deletePostController,
  updatePostController,
  addCommentController,
  deleteCommentController,
  addReplyController,
};
