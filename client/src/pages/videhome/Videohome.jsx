import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Videoshareandsee from "../../components/videocomponent/Videoshareandsee";
import Rightbar from "../../components/rightbar/Rightbar";
import "./videohome.css"

export default function Videohome() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Videoshareandsee/>
        <Rightbar/>
      </div>
    </>
  );
}