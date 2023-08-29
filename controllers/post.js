const Post = require("../models/post");
const addPost= async (req, res) => {
    try {
      const {
        postImg,
        postTitle,
        postSummary,
        postBodytext,
        postCategory,
        postTags,
        postSection,
        postAuthor,
        postDate,
      } = req.body;
      const newPost = new Post({
        postImg,
        postTitle,
        postSummary,
        postBodytext,
        postCategory,
        postTags,
        postSection,
        postAuthor,
        postDate,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.log(error);
    }
  }
  const getPosts=async(req,res)=>{

    try {
      const posts= await Post.find()
      res.status(200).json(posts)
      
    } catch (error) {
      res.status(404).json(error)
      
    }  
    }
    const getPost=async(req,res)=>{
        try {
          const id = req.params.id;
      const post=await Post.findById(id)
          res.status(200).json(post)
        } catch (error) {
          res.status(404).json(error)
        }
      }
      const updatePost=async(req,res)=>{
        try {
          const id = req.params.id;
          const options={new:true};
      const updatedPost=await Post.findByIdAndUpdate(id,req.body,options)
          res.status(200).json(updatedPost)
        } catch (error) {
          res.status(404).json(error)
        }
      }
      const deletePost=async(req,res)=>{
        try {
          const id = req.params.id;
      const deletedPost=await Post.findByIdAndDelete(id)
      res.status(200).json(deletedPost)
        } catch (error) {
          res.status(404).json(error) 
        }
      }
      module.exports={addPost,getPost,getPosts,updatePost,deletePost}