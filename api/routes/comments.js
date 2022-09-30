const router = require("express").Router();
const Comment = require("../models/Comments");

//new conv

router.post("/", async (req, res) => {
  
  
  const newConversation = new Comment({
postid:req.body.postid,
    createdby:req.body.createdby,
    desc:req.body.desc,
    currentuserimage:req.body.currentuserimage,
});

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/cc/:Id", async (req, res) => {
  try {
    const conversation = await Comment.find({
      postid:req.params.Id },
    )
    res.status(200).json(conversation);
  } catch (err) {
  
    res.status(500).json(err);
  }
});

module.exports = router;
