import axios from "axios";
import { useRef, useState } from "react";
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import "./update.css";

import { useHistory } from "react-router";


export default function Update() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const desc = useRef();
  const relation=useRef();
  const ddd=useRef();
  
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [file, setFile] = useState(null);


  const handleClick = async (e) => {
    e.preventDefault();
   
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      let str=ddd.current.value;
        var res = str.split("-", 2);
var res1=res[0]+","+res[1];
        const user1 = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
    desc:desc.current.value,
    city:city.current.value,
    userId:user._id,
    profilePicture:fileName,
   coverPicture:fileName, 
   relationship:relation.current.value,
   birthday:res1,
  };
    try {
     
      const res=await axios.put("http://localhost:8800/api/users/" + user._id, user1);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
  };


  return (
    
      <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">Please update your profile</span>
          </div>
             <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            type="text"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            
            <input
              placeholder="city"
              required
              ref={city}
              className="loginInput"
              type="text"
            />
             <input
              placeholder="desc"
              required
              ref={desc}
              className="loginInput"
              type="text"
            />
<input
              placeholder="relation"
              required
              ref={relation}
              className="loginInput"
              type="text"
            />
            
<input
              placeholder="Date"
              ref={ddd}
              className="loginInput"
              type="text"
            />
            <div className="filedesign">
<input
required
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
className="loginInput1"
            />
</div>
            <button className="loginButton" type="submit">
              Update
            </button>
          </form>
      
        </div>
      </div>
          

  );
}
