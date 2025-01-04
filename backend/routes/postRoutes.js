const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.get('/',async (req,res)=>{
    try{
        const post = await Post.find();
        return res.status(200).json(post);

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.post('/',async (req,res)=>{
    const {title, content,author} = req.body;
    try{
        const newPost = new Post({title,content,author});
        await newPost.save();
        return res.status(201).json(newPost);

    }
    catch(err){
        res.status(500).json({error: err.message})
    }

})

router.get('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({error: 'Post not found'})

    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const updatePost = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json(updatePost);

    }
    catch(err){
        res.status(404).json({error: 'Post not found'})

    }
})
router.delete("/:id", async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;