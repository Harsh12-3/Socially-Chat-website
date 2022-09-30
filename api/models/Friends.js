const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    friendId1:{
        type: String,     
    },
    friendId2:{
       type: String, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friends", MessageSchema);
