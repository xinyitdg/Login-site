import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Layout, Menu } from "antd";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import EditList from "./EditList";

const { Header } = Layout;

const Home = () => {
  const { username, setUsername } = useContext(UserContext);
  const { dataList, setDataList } = useContext(UserContext);
  const { loginName, setloginName } = useContext(UserContext);
  const [ open, setOpen ] = useState(false); // Modal state
  const [ newList, setNewList ] = useState(null);

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  const callAPI = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = res.data.slice(0, 10);

      // Set loginName for each data
      const newDataList = data.map((item, index) => ({ ...item, loginName: loginName[index] || "Unknown" }));
      setDataList(newDataList);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Call API when component mounts or loginName changes
  useEffect(() => {
    callAPI();
  }, [loginName, setDataList]); 

  const showModal = () => {
    setOpen(true);
  };

  const handleSave = async (id) => {
    try {
      const result = await axios({
        method: "put",
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        data: {
          title: newList.title,
          body: newList.body,
        },
      });

      const newDataList = dataList.map((data) => {
        if (data.id === result.data.id) {
          return { ...data, ...result.data }; // return editedresult.data array that overrides data
        } else {
          return data;
        }
      });
      setDataList(newDataList);
      setNewList(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setNewList(null);
  };
  

  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal">
          <div style={{ flex: 1 }}>
            <h1>Welcome, {username}!</h1>
          </div>
          <button className="logout" onClick={goToLogin}>
            Logout
          </button>
        </Menu>
      </Header>
      <div className="item-container" >
        {dataList.map((data) => (
          <div className="item-box" key={data.id}> 
            <div className="item-content">
              <i>{data.loginName}</i>
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>

            <div className="item-buttons">
              <button
                className="Button"
                type="button"
                onClick={() => {
                  setNewList({ id: data.id, title: data.title, body: data.body });
                  showModal();
                }}
                disabled={data.loginName !== username} // only show buttons where username is the owner
              >
                Edit
              </button>
              <EditList
                isOpen={newList != null}
                title={newList?.title}
                body={newList?.body}
                handleOnChange={(name, e) =>
                  setNewList({
                    ...newList,
                    [name]: e.target.value, // name = title or body
                  })
                }
                onSave={() => handleSave(newList.id)}
                onCancel={() => handleCancel()}
              />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
