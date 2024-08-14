import React, { useContext, useState } from "react";
import "./Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { username, setUsername } = useContext(UserContext);
  const { loginName, setLoginName } = useContext(UserContext);
  const [ localUsername, setLocalUsername ] = useState("");

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  const goToLogin = () => {
    navigate("/Login");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validUsername(localUsername)) {
      setUsername(localUsername); // update username to local username -> Home
      setLocalUsername(""); // clear local username input
      setUsername("");
      alert("You are now registered, please login");
      goToLogin();
    }
  };

  const handleOnChange = (e) => {
    setLocalUsername(e.target.value);
  };

  // Check if entered name is among loginName
  const validUsername = (localUsername) => {
    if (loginName.includes(localUsername)) {
      alert("Username already exists, please login"); // username exists, prompt login
      return false; 
    } else {
      addUser();
      return true;
    }
  };

  const addUser = () => {
      // const newLoginName = loginName.map((localUsername) =>{
      //     return { ...loginName, ...localUsername}; 
      // }); // doesnt work - generates array of objects instead of usernames
      const newLoginName = [...loginName, localUsername]; // append new username to loginName
      setLoginName(newLoginName);
  };

  console.log("username", username);
  console.log("localUsername", localUsername);
  
  return (
    <form onSubmit={formSubmit}>
      <div className="wrapper">
        <h1 className="title">Register</h1>
        <div className="input-box">
          <input className="username" type="text" placeholder="Username" required value={localUsername} onChange={handleOnChange}></input>
          <span className="icon">
            <UserOutlined />
          </span>
        </div>

        <button className="button" type="submit">
          Sign Up
        </button>

        <div className="registerlink">
          <p>
            Already have an account? <span onClick={() => goToLogin()}>Login</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
