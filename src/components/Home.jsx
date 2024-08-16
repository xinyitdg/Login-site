import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { UserContext } from "../context/UserContext";
import EditList from "./EditList";

const Home = () => {
  const { dataList, setDataList, loginName, setLoginName, newData, setNewData } = useContext(UserContext);
  const [ open, setOpen ] = useState(false); // Modal state for editing
  const [ newList, setNewList ] = useState(null);
  const [ username, setUsername ] = useState(null); // Set username locally, so it doesnt load username = "" from UserContext

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  useEffect(() => {
    // Check if username exists and redirect to login if not
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate, setUsername]);

  const showModal = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    // Generate a new ID
    const newId = () => {
      if (dataList.length > 0) {
        // if objects exists = new post
        const lastIndex = dataList.length - 1; // get last object index
        return dataList[lastIndex].id + 1; // return id of that object + 1
      }
      return 1; // return 1 if no data exists
    };

    // Create a new posts
    const newPost = {
      id: newId(),
      title: newData.title,
      body: newData.body,
      loginName: username,
    };

    console.log(newPost);
    console.log(dataList);

    // Add the new post to the list
    const updatedDataList = [...dataList, newPost];
    setDataList(updatedDataList);
    
    // Save dataList - title, body, ID - to local storage
    const storedDataList = JSON.stringify(updatedDataList);
    localStorage.setItem('dataList', storedDataList);
    setNewData({ title: "", body: "" });
  };

  const handleSave = (id) => {
    // Local save for editing post
    const newDataList = dataList.map((data) => {
      if (data.id === id) {
        return { ...data, ...newList }; // Update existing data
      } else {
        return data;
      }
    });
    setDataList(newDataList);
    setNewList(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setNewList(null);
  };

  const handleDelete = (id) => {
    // Remove post from local state
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
    console.log("Delete: ", id);
  };


  // Retrieve all from local storage when component mounts
  useEffect(() => {
    const storedDataList = JSON.parse(localStorage.getItem('dataList')) || [];


    if (storedDataList) {
      setDataList(storedDataList);
    } else {
      navigate("/login"); // Redirect to login if no username is found
    }
  }, [ setDataList]);
  
  

  return (
    <div className="container">
      <div className="header">
        <div className="menu">
          <h1>Welcome, {username}!</h1>
        </div>
        <button className="logout" onClick={goToLogin}>
          Logout
        </button>
      </div>
      <div className="item-container">
        <div className="add-group">
          <div className="add-input">
            <input
              className="add-title"
              placeholder="Title"
              value={newData.title}
              onChange={(e) => setNewData({ ...newData, title: e.target.value })}
              required
            />
            <textarea
              className="add-body"
              placeholder="Body"
              value={newData.body}
              onChange={(e) => setNewData({ ...newData, body: e.target.value })}
              required
            />
          </div>
          <button
            className="add-button"
            type="button"
            onClick={handleAdd}
            disabled={!newData.title || !newData.body}
          >
            Add Post
          </button>
        </div>
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
              <button
                className="Button"
                type="button"
                onClick={() => handleDelete(data.id)} // Pass the id of the item to delete
                disabled={data.loginName !== username}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
