import { useContext, useEffect, useState } from "react";
import Videopost from "../videopost/Videopost";
import Video from "../videoshare/Video";
import "./videoshareandsee.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Videoshareandsee({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res =  await axios.get("videoss/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Video />}
        {posts.map((p) => (
          <Videopost key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}