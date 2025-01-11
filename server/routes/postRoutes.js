const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const {
  createPostController,
  getAllpostController,
  getUserPostsController,
  deletePostController,
  updatePostController,
  addCommentController,
  deleteCommentController,
  addReplyController,
} = require('../controllers/postController');

const router = express.Router();

router.post('/create-post', requireSignIn, createPostController);
router.get('/get-all-posts', getAllpostController);
router.get('/get-user-posts', requireSignIn, getUserPostsController);
router.delete('/delete-post/:id', requireSignIn, deletePostController);
router.put('/update-post/:id', requireSignIn, updatePostController);
router.post('/add-comment/:postId', requireSignIn, addCommentController);
router.delete('/delete-comment/:postId/:commentId', requireSignIn, deleteCommentController);
router.post('/:postId/add-reply/:commentId', requireSignIn, addReplyController);

module.exports = router;
