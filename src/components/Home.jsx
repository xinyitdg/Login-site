import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Layout, Menu, Input } from "antd";
import { UserContext } from "../context/UserContext";
import EditList from "./EditList";

const { TextArea } = Input;
const { Header } = Layout;

const Home = () => {
  const { username, dataList, setDataList, loginName,newData, setNewData } = useContext(UserContext);
  const [open, setOpen] = useState(false); // Modal state for editing
  const [newList, setNewList] = useState(null);

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  const showModal = () => {
    setOpen(true);
  };


  const handleAdd = () => {
    // Generate a new ID
    const newId = () => {
      if (dataList.length > 0) { // if objects exists = new post
        const lastIndex = dataList.length - 1; // get last object index
        return dataList[lastIndex].id + 1; // return id of that object + 1
      };
       
    }

    // Create a new post
    const newPost = {
      id: newId,
      title: newData.title,
      body: newData.body,
      loginName: username
    };

    console.log(newPost); 
    console.log(dataList); 

    // Add the new post to the list
    setDataList([...dataList, newPost]);
    setNewData({ title: '', body: '' }); 
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
    console.log("Delete: ", id)
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
      <div className="item-container">
        <div className="add-group">
          <div className="add-input">
          <Input
            className="add-margin"
            placeholder="Title"
            value={newData.title}
            onChange={(e) => setNewData({ ...newData, title: e.target.value })}
            required
          />
          <TextArea
            className="add-margin"
            placeholder="Body"
            rows={4}
            value={newData.body}
            onChange={(e) => setNewData({ ...newData, body: e.target.value })}
            required
          />            
          </div>
          <button className="add-button" type="button" onClick={handleAdd} disabled={!newData.title || !newData.body}>
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
    </Layout>
  );
};

export default Home;
