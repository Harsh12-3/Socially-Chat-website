import "./closeFriend.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function CloseFriend({user1}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
  const history = useHistory();

  const sendrequest = async (e) => {
  
  const con={
    senderId:user._id,
    receiverId:user1._id,
  }
  const res1 = await axios.post("/conversations",con);
        
  
      const message = {
        sender: user._id,
        text: 'Hi I am Harsh wana be my friend',
        conversationId: res1._id,
      };
  
      try {
        const res = await axios.post("/messages", message);
   history.push("/messenger");
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <li className="sidebarFriend" onClick={sendrequest}>
      <img className="sidebarFriendImg" src={user1
                      ? PF + user1.profilePicture
                      : PF + "person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{user1?user1.username:"null"}</span>
    </li>
  );
}
