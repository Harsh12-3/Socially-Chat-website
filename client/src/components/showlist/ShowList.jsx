import axios from "axios";
import "./showlist.css";
export default function Post({ showlist }) {

  const deletetodo= async (e) => {
  axios.delete("http://localhost:8800/api/todo/"+showlist._id);  
  window.location.reload();  
}

    return (
  
  <div className="delete">
      <li>{showlist.todo}</li> 
     <span className="close" onClick={deletetodo}>Done</span>     
     </div>
    )};
