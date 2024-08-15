import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { username, setUsername, loginName } = useContext(UserContext);
  const [ localUsername, setLocalUsername ] = useState("");

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validUsername(localUsername)) {
      setUsername(localUsername); // update username to local username -> Home
      setLocalUsername(""); // clear local username input
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    setLocalUsername(e.target.value);
  };

  // Check if entered name is among loginName
  const validUsername = (localUsername) => {
    if (loginName.includes(localUsername)) {
      return true; // username is valid
    } else {
      alert("Please try again or register your account");
      return false;
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <div className="wrapper">
        <h1 className="title">Login</h1>
        <div className="input-box">
          <input className="username" type="text" placeholder="Username" required value={localUsername} onChange={handleOnChange} />
          <span className="icon">
            <UserOutlined />
          </span>
        </div>

        <button className="button" type="submit">
          Login
        </button>

        <div className="registerlink">
          <p>
            Don't have an account? <span onClick={goToRegister}>Register</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
