import "./notify.css";
import { Search, Person, Chat, Notifications} from "@material-ui/icons";
import { Link,useHistory} from "react-router-dom";
import { useContext,useRef } from "react";
import { loginCallremove } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../context/AuthActions";
//import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Notify() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 // const history = useHistory();
  const {count,notificationname } = useContext(AuthContext);
  const[name,setname]=useState();
  useEffect(() => {
    
        const notify = async () => {
          try{
            if(notificationname!==null){
            const res = await axios.get("/users/ff/" + notificationname);      
            setname(res.data);
          }
          }catch(err){
              console.log(err);
            }
         
       
          
      
          };
        
      notify();    
      
    
  }, []);



  return (
 <>
 
 <h1>{count}</h1>
 {name && <p>{name.username}</p>}
 </>
 
  )
}