const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {

    postid:{
type: String
    } ,   
    createdby: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    currentuserimage:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comments);
