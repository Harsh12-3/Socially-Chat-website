import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import Showfriends from "../showfriends/Showfriends";
import { useHistory } from "react-router";


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const [birthday, setbirthday] = useState([]);
  const history = useHistory();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    user && currentUser.followings.includes(user?.id)
  );

useEffect(()=>{
  const getbirthday = async () => {
    try {
      var today = new Date();
      var date = (today.getMonth()+1)+','+today.getDate();

      const friendList = await axios.get("/users/ff1/" + date);
      setbirthday(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };
  getbirthday();



},[currentUser]);

  

  const handleClick = async () => {
  
      const con={
        senderId:currentUser._id,
        receiverId:user._id,
      }
    
      const con1={
        friendId1:currentUser._id,
        friendId2:user._id,
      }
      
      const con2={
        friendId1:user._id,
        friendId2:currentUser._id,
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
            sender: currentUser._id,
            text: 'Hi I am Harsh wana be my friend',
            conversationId: res1._id,
          };
      
          try {
            const res = await axios.post("/messages", message);
       history.push("/messenger");
          } catch (err) {
            console.log(err);
          }
        };  
  

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
 { console.log(birthday.length)}
          <span className="birthdayText">
            {(birthday.length===0)?(<b>No birthdays today</b>):(<b>{birthday[0].username} and {birthday.length-1} other friends have a birhday today.</b>)
  }</span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Birthdays</h4>
        <ul className="rightbarFriendList">
          {birthday.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/conversations/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [user]);
  
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
           Chat
             </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Nationality:</span>
            <span className="rightbarInfoValue">{"Indian"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          
          {friends.map((friend) => (
       <div>
        { friend.members[0]!==user._id &&<Showfriends message={friend.members[0]}/>}
        { friend.members[1]!==user._id && <Showfriends message={friend.members[1]}/>}
         
          </div>
             ))}
 
           {/*<Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
                */}
         

        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
