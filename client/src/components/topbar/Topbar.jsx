import "./topbar.css";
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

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 // const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [user1,setUser]= useState(user);
  const socket = useRef();
const search=useRef();    
 

  
  useEffect(() => {
    
    const getUser = async () => {
      try {
        const res = await axios.get("/users/ff/" + user._id);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
    handlesearch();
  }
};
function handlesearch(){
  
  
  
  const search1 = async (dispatch) => {
    try{
     
      dispatch({ type: "LOGIN_SEARCH" , payload:search.current.value});
      history.push("/search")

    }catch(err){
      console.log(err);
      }
   
 
    

    };
  
search1(dispatch);    

};

  function handlesignout(){
    
    const logoutCall = async (dispatch) => {
      try{
      dispatch({ type: "LOGOUT" });
       
      } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      };
        
  logoutCall(dispatch);    
    }

  function hompag(){
    history.push("/");
     }
  
 
     function videopage1(){
      history.push("/videos");
       }
 
       function notify(){
        history.push("/notify");
         }
    
       return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socially</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            ref={search}
            onKeyPress={handleKeypress}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={hompag}>Homepage</span>
          <span className="topbarLink" onClick={videopage1}>Videos</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge" onClick={notify}>1</span>
          </div>          
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user1.profilePicture
                ? PF + user1.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="logoutIcon">
        <i class="icon-signout  icon-2x" onClick={handlesignout}></i>
      
</div>
      </div>
    </div>
  );
}
