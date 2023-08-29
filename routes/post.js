const {
  addPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/post");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();

//Adding posts//
router.post("/new", addPost);
//Get all posts

router.get("/", getPosts);
//get single post
router.get("/:id", getPost);
//update
router.patch("/update/:id", updatePost);
//delete
router.delete("/delete/:id", deletePost);
module.exports = router;
