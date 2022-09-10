import { useState,useEffect } from "react";
import Item from "../../components/NewsIteam/Item";
import "./news.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

const axios = require("axios");

export default function News() {
   
      
  const[list,setList]=useState([null]);
    useEffect(() => {
    

        const getNews = async () => {
        const respon="https://newsapi.org/v2/top-headlines?country=us&apiKey=b1ec950c94f84d8881d292a52be7a407";
         
        let data = await fetch(respon);
    
        let parsedData = await data.json()
    
        setList(parsedData.articles)
        
    
           }
           getNews();
  
}, []);
    
    
    
    return (
<>
<Topbar/>        
<div className="divide">
  <Sidebar/>
      <div className="app">
      {list[0]!==null && <ul>

      
     {list.map((c) => (
     <Item  item={c} />
       
       ))}
     
      </ul>
  }

</div>
<Rightbar/>
  </div>
  </>  
    );
  }
  
  