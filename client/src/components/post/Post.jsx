import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState,useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post, own }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comm, setcomment] = useState([]);
  const [togglecomm, settogglecomment] = useState(0);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
const commentdesc = useRef();

useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/ff/" + post.userId);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try{
      const res = await axios.get("http://localhost:8800/api/comments/cc/" + post._id);
      setcomment(res.data);
      }catch(err){
      console.log(err);  
      }
    };
    fetchUser();
  }, [post]);


  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
const deletepost= async ()=>{
console.log(post.userId);
  const pwwwww={
userId: post.userId,
};


try{
await axios.delete("http://localhost:8800/api/posts/" + post._id, pwwwww);
window.location.reload();
}catch(err){
  console.log(err);
}
}

const handleKeypress = (e) => {
  //it triggers by pressing the enter key
  if (e.key === 'Enter') {
  Commentpost();
}
};

const toggle =async ()=>{
  

  settogglecomment((prevState) => (
      prevState+1
    ))
}

const Commentpost= async ()=>{
  console.log(commentdesc.current.value);
    const pwwwww={
      postid:post._id,
      createdby:currentUser.username,
      desc:commentdesc.current.value,
    currentuserimage:currentUser.profilePicture
    };
   
  
  try{
  await axios.post("http://localhost:8800/api/comments/", pwwwww);
  window.location.reload();

}catch(err){
    console.log(err);
  }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            
            {own==="0" && <span className="postCommentText" onClick={deletepost}>Delete</span>}
          {own==='1' && <input className="postCommentCreation" placeholder="Comments" ref={commentdesc} onKeyPress={handleKeypress}></input>}
          
          </div>
        </div>
        {own==="0" && <button className="togglediv" onClick={toggle}>Comments</button>
} 
        {(togglecomm%2===1) && <div>
        {own==="0" && comm.map((p1) => (
       <div className="postTopLeft1"> 
       
    
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  p1.currentuserimage
                    ? PF + p1.currentuserimage
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{p1.createdby}</span>
            <span className="postText">{p1.desc}</span>
          </div>
          
    ))}
     </div>}
      </div>
    </div>
  );
}
