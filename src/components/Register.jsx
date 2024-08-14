import React, { useContext, useState } from "react";
import "./Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { username, setUsername } = useContext(UserContext);
  const { loginName, setloginName } = useContext(UserContext);
  const [localUsername, setLocalUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const goToLogin = () => {
    navigate("/Login");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validUsername(localUsername)) {
      setUsername(localUsername); // 
      setLocalUsername(""); // clear local username input
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const validUsername = () => {
    console.log("check if localusername is among loginName")
    console.log("add localusername to loginName")
  };
  
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
