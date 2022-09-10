import "./showfriends.css";
import axios from "axios";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Showfriends({ message}) {
const [friend,setUser]=useState(null);
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
    <>
    <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>

    </>     
    );
}
