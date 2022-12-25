import React, { useCallback, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";

import "./App.css";
import InfosContext from "./context/infosContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [indexInfo, setIndexInfo] = useState({});

  const router = useRoutes(routes);

  const login = (userInfos, token) => {
    setToken(token);
    console.log(userInfos);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  const logout = () => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setUserInfos(userData);
          setIsLoggedIn(true);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [login, logout]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then((res) => res.json())
      .then((infos) => setIndexInfo(infos));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      <InfosContext.Provider value={indexInfo}>{router}</InfosContext.Provider>
    </AuthContext.Provider>
  );
}
