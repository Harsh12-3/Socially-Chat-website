import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useHistory } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Sidebar() {
  const history = useHistory();
const {user}=useContext(AuthContext);
const [User,setUser]=useState([]);
const [Conver,setConversation]=useState([]);

useEffect(() => {
    
    const getUser = async () => {
      try {
        const res = await axios.get("/users/alluserId/" + user._id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();


  }, []);

  



  const messenger = async (e) => {

    history.push("/messenger");
  }
  const getevery = async (e) => {
console.log("Harsh");
    history.push("/allpost");
  }

  const update = async (e) => {
    console.log("Harsh");
        history.push("/update");
      }
    
  const todo = async (e) => {
  
        history.push("/todo");
      }


      const allvideo = async (e) => {
  
        history.push("/allvideo");
      }




  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          
          <li className="sidebarListItem" onClick={messenger}>
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem" onClick={getevery}>
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Allpost</span>
          </li>
          <li className="sidebarListItem" onClick={update}>
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Update Profile</span>
          </li>
   
          <li className="sidebarListItem" onClick={allvideo}>
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Allvideo</span>
          </li>
    
    
          {/*
   
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>*/}
        </ul>
        <button className="sidebarButton">Suggestion</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        
         
          {User.map((u) => (
         u._id!==user._id && <CloseFriend key={u.id} user1={u} />
         
          ))}
        </ul>
      </div>
    </div>
  );
}
