import { useContext, useRef} from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "reactstrap"
import { useState,useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const history=useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);
  const[alert,setalert]=useState("0");
  const handleClick = async(e) => {
    e.preventDefault();
try{
  const userCredential=({email: email.current.value, password: password.current.value});
  const res = await axios.post("/auth/login", userCredential);
  loginCall(
    { email: email.current.value, password: password.current.value },
    dispatch
  );


}catch(err){
  setalert("true");
}

  }

  function Alert(props) {
    return <MuiAlert elevation={6} 
                     variant="filled"{...props} 
                     />;
  }

const reloadpage = (e)=>{
 


document.getElementById("newform").reset();
setalert("0"); 

}

  const registerpage = (e) => {
  history.push("/register");
  };


  return (

<div>

{(alert!=="0") && <Alert onClose={reloadpage} severity="error">Either password or email is invalid</Alert>}
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">

          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} id="newform">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
              id="myemail"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
              id="mypassword"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={registerpage}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div></div>

  );
}
