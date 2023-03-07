const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc Get post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]); // nối với user, lấy ra username
    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Máy chủ không phản hồi",
      success: false,
    });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    console.log(title, description, url, status);
    return res.status(400).json({
      message: "Chưa nhập tiêu đề",
      success: false,
    });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "to learn",
      user: req.userId,
    });

    await newPost.save();

    res.json({
      message: "Tạo post thành công",
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Máy chủ không phản hồi",
      success: false,
    });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  console.log("TItle ban đầu: ", title);

  // Simple validation
  if (!title) {
    return res.status(400).json({
      message: "Chưa nhập tiêu đề",
      success: false,
    });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "to learn",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      {
        new: true,
      }
    );

    // User not authorised to update post or post not found
    if (!updatedPost) {
      return res.status(401).json({
        message: "Không tìm thấy bài post hoặc user không có quyền",
        success: false,
      });
    }

    res.json({
      message: "Cập nhật post thành công",
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Máy chủ không phản hồi",
      success: false,
    });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCOndition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCOndition);

    // User not authorised to update post or post not found
    if (!deletedPost) {
      return res.status(401).json({
        message: "Không tìm thấy bài post hoặc user không có quyền",
        success: false,
      });
    }

    res.json({
      message: "Xóa post thành công",
      success: true,
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Máy chủ không phản hồi",
      success: false,
    });
  }
});

module.exports = router;
