import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./searchpp.css";


import { AuthContext } from "../../context/AuthContext";

export default function Searchpp({user3}) {
  const[posts,setPosts]=useState([]);
console.log("searchpp");  
 console.log(user3); 
    

    
    useEffect(() => {
          
      const fetchPosts = async () => {
            try{
           console.log("enter");
              const ress= await axios.get("/posts/timeline/" + user3[0]._id);
        
            
            setPosts(
              ress.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
          }catch(err){
              console.log(err);
            }
            
          };
          fetchPosts();
        }, [user3]);
      
    return (
      
   <div className="feed">
        <div className="feedWrapper">

{(posts.length!==0)?
        <div>
        {posts.map((p) => (
            <Post key={p._id} post={p} own={"1"}/>
          ))}
          </div>
          :<h1 className="nothing">Nothing to Show</h1>}
        </div>
      </div>
  
      
       
    );
  }