import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./searchresult.css";
import Searchpp from "../searchpp/Searchpp";

import { AuthContext } from "../../context/AuthContext";

export default function Searchresult() {
    const { user,user2 } = useContext(AuthContext);
 const[check,setCheck]=useState();
 
    useEffect(() => {
      
  const fetchPosts = async () => {
        try{
          const ress= await axios.get("/users/find1111/" + user2);
    setCheck(ress.data);
        
        {/*setPosts(
          re.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );*/}
      }catch(err){
       console.log("hrrrprprpfprkd[gpkprdg"); 
          console.log(err);
        }
        
      };
      fetchPosts();
    }, [user2]);
  
   
    return (
<>
      {/*   
   <div className="feed">
        <div className="feedWrapper">

{check?<h1>{check._id}</h1>:<p>Hello how are you</p>

   
          {posts.map((p) => (
            <Post key={p._id} post={p} own={"1"}/>
          ))}
        </div>
      </div>
  
        }*/}
  
        <Searchpp user3={check}/>
</>      
    );
  }