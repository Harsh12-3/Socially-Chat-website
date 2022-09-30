import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function Onlineuser({ onlineUsers, currentuser }) {
  const [friends, setFriends] = useState({});
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [conv,setConv]=useState([]);
  const [set,setState] = useState(new Set())

    
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/ff/" + onlineUsers.userId);
      setFriends(res.data);
    };

    getFriends();
  }, [onlineUsers]);

  
  const sendrequest = async (e) => {
 
    const con={
        senderId:user._id,
        receiverId:onlineUsers.userId,
      }
      
      const con1={
        friendId1:user._id,
        friendId2:onlineUsers.userId,
      }
      
      const con2={
        friendId1:onlineUsers.userId,
        friendId2:user._id,
      }
      
      try{
        const res1 = await axios.post("/friends",con1);
      
      
      }catch(err){
      console.log(err);
      }
          
      try{
        const res1 = await axios.post("/friends",con2);
      
      
      }catch(err){
      console.log(err);
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
  
  
  
  
  
     
    }
  



    {/*
const con={
  senderId:user._id,
  receiverId:onlineUsers.userId,
}

const con1={
  friendId1:user._id,
  friendId2:onlineUsers.userId,
}

const con2={
  friendId1:onlineUsers.userId,
  friendId2:user._id,
}

try{
  const res1 = await axios.post("/friends",con1);


}catch(err){
console.log(err);
}
    
try{
  const res1 = await axios.post("/friends",con2);


}catch(err){
console.log(err);
}



const res1 = await axios.post("/conversations",con);
      

    const message = {
      sender: user._id,
      text: 'Hi I am Harsh wana be my friend',
      conversationId: res1._id,
    };



    try {
      const res = await axios.post("/messages", message);
 //history.push("/messenger");
    } catch (err) {
      console.log(err);
    }*/}
  



  return (



<li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img className="rightbarProfileImg" src={  friends.profilePicture? PF + friends.profilePicture
                    : PF + "person/noAvatar.png"
              } alt="" />
      <span className="rightbarOnline"></span>
{      console.log(set.size)}

    </div>
    <span className="rightbarUsername" onClick={sendrequest}>{friends.username?friends.username:"Hello"}</span>
  </li>
);
}
