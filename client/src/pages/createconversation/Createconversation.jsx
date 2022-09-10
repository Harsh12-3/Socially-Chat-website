
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ChatOnline from "../../components/onlineuser/Onlineuser";
import axios from "axios";
import { io } from "socket.io-client";

export default function Createconversation() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
  

  useEffect(() => {
    const getConversations = async () => {
   
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
  
      setOnlineUsers(users);
    });
  }
  {user &&
      getConversations();   
    }
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      
      try {
         const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {onlineUsers.map((c) => (
             c.userId!==user._id && <div >
            
            
                <ChatOnline onlineUsers={c}  currentuser={user._Id}/>
              </div>
            ))}
          </div>
        </div>
        </div>
            </>
  );
}
