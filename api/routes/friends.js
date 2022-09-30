const router = require("express").Router();
const Friends = require("../models/Friends");

//add

router.post("/", async (req, res) => {
  const newMessage = new Friends({
    friendId1:req.body.friendId1,
    friendId2:req.body.friendId2,
    

  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:friendId1", async (req, res) => {
 
    try {
    const messages = await Friends.find({
        friendId1: req.params.friendId1,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
