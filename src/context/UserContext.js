import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [dataList, setDataList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loginName, setLoginName] = useState(["xy", "anis", "jack", "lichuan", "geetha", "alif", "atika", "janjit", "hanzhong", "brendon"]); // username for each data

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        dataList,
        setDataList,
        title,
        setTitle,
        body,
        setBody,
        loginName,
        setLoginName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// export default UserContext;
