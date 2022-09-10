import axios from "axios";
import { useRef, useState,useEffect } from "react";
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import "./todo.css";
import Topbar from "../../components/topbar/Topbar";
import ShowList from "../../components/showlist/ShowList";


import { useHistory } from "react-router";




export default function Todo() {
  console.log("todo");
  const iteam=useRef();
const { user } = useContext(AuthContext);
const [list, setList] = useState([]);
 
useEffect(() => {
  const fetchUser = async () => {
    const res=await axios.get("http://localhost:8800/api/todo/"+user._id);
 
    setList(res.data);
  };
  fetchUser();
}, [user._id]);

  const todo = async (e) => {
  const user1={
todo:iteam.current.value,
userId:user._id,
done:"true",
  };
  try{
    const res=await axios.post("http://localhost:8800/api/todo", user1);
    window.location.reload();
  }catch(err){
    console.log(err);
   
  }

  }

    return (
        <>
 <Topbar />
        <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input type="text" className="myddInput" placeholder="Title..." ref={iteam}/>
        <span onClick={todo} className="addddBtn">Add</span>
      </div>
      
      <ul id="myUL">
      {list.map((p) => (
          <ShowList key={p._id} showlist={p} />
        ))}   
      </ul>
      </>
      );
  }