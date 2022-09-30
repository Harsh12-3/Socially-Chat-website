import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Searchresult from "../../components/searchresult/Searchresult";
import Rightbar from "../../components/rightbar/Rightbar";
import "./search.css"
import { AuthContext } from "../../context/AuthContext";
export default function Search() {
  
  
  return (
   
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Searchresult />
        <Rightbar/>
      </div>
    </>
  );
}
