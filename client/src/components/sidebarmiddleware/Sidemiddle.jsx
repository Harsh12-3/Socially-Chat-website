import "./sidemiddle.css";
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

export default function Sidemiddle({user1,conv}) {
  const history = useHistory();
const {user}=useContext(AuthContext);
const [User,setUser]=useState([]);
const [Conver,setConversation]=useState([]);
const mySet = new Set();
 mySet.add(1);
useEffect(() => {
    
    const getUser = async () => {
      try {
        conv.map((u) => (
         
            (u.members[0]===user1._id || u.members[1]===user1._id) && mySet.add(user1)
          
               
                ))
             
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

      const addfunction = async (e) => {
    mySet.add(user1);   
    }
      


  return (
    <div className="sidebar">
       <li className="sidebarFriend">
       { mySet.size===2 &&  <CloseFriend user1={user1}/>}
       </li>
    </div>
  );
}