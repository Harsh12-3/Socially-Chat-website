import "./message.css";
import axios from "axios";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
 
export default function Message({ message, own }) {
const [user,setUser]=useState(null);
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

useEffect(() => {
    
    const getUser = async () => {
      try {
        const res = await axios.get("/users/ff/" + message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={user?.profilePicture
          ? PF + user.profilePicture
          : PF + "person/noAvatar.png"
      }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
