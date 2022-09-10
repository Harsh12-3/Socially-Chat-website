import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Everyvideo from "../../components/everyvideo/Everyvideo";
import Rightbar from "../../components/rightbar/Rightbar";
import "./allvideo.css"

export default function Allvideo() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Everyvideo/>
        <Rightbar/>
      </div>
    </>
  );
}
