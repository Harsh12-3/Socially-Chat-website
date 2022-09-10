const router=require('express').Router()
const Todo=require('../models/Todo')


router.post("/", async (req, res) => {
    const todo= new Todo(req.body);
    try {
      const savedPost = await todo.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/:userid", async (req, res) => {
    try{
        const posts = await Todo.find({ userId: req.params.userid });
        res.status(200).json(posts);
  
    } catch (err) {
 
        res.status(500).json(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    const post = await Todo.findById(req.params.id);
  
    try{
   await post.deleteOne();
   res.status(200).json("Post deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;
