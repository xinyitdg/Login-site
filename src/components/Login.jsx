import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { username, setUsername } = useContext(UserContext);
  const [ localUsername, setLocalUsername ] = useState("");
  const { loginName, setloginName } = useContext(UserContext);

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (validUsername(localUsername)) {
      setUsername(localUsername); // update username to local username
      setLocalUsername(""); // clear local username input
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const validUsername = (username) => {
    if (localUsername === username) {
      return true; // username is valid
    } else {
      alert("Invalid username");
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
