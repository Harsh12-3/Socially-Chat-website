import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user1, setUser] = useState({});
  const username = useParams().username;
  const { user } = useContext(AuthContext);
 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/users/ff/" + user._id);
      setUser(res.data);
    };
    fetchUser();
  }, [user._id]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user1.coverPicture
                    ? PF + user1.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user1.profilePicture
                    ? PF + user1.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user1.username}</h4>
              <span className="profileInfoDesc">{user1.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user1} />
          </div>
        </div>
      </div>
    </>
  );
}
