import { useContext, useRef} from "react";
import "./deleteaccount.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from "reactstrap"
import { useState,useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";


export default function Deleteaccount() {
  const email = useRef();
  const password = useRef();
  const history=useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);
  const[alert,setalert]=useState("1");
  const handleClick = async(e) => {
    e.preventDefault();
try{
  const p=({email: email.current.value});
  const res = await axios.delete("http://localhost:8800/api/users/userrr/" + email.current.value,p);
  handlesignout();
history.push("/register");
}catch(err){
console.log(err);
}

  }

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

{(alert!=="0") && <Alert onClose={reloadpage} severity="error">Are you sure you want to delete your account</Alert>}
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
                "Remove account"
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
