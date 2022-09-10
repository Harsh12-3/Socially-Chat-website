import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const desc = useRef();
  const [file, setFile] = useState(null);
const [user1,setUser]= useState(user);
  useEffect(() => {
    
    const getUser = async () => {
      try {
        const res = await axios.get("/users/ff/" + user._id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const news = async (e) => {
      history.push("/news");
    }
  
  const todo = async (e) => {
  console.log("Yes");
    history.push("/todo");
  }
  const online = async (e) => {
    console.log("Yes");
      history.push("/online");
    }
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user1.profilePicture
                ? PF + user1.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon"/>
              <span className="shareOptionText" onClick={todo}>Todo</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="green" className="shareIcon" />
              <span className="shareOptionText" onClick={online}>Online</span>
            </div>
            <div className="shareOption">
              <Cancel htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText" onClick={news}>News</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
