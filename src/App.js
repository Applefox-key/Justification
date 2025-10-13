import React, { useEffect, useState } from "react";
import "./App.scss";

import { PopupContext } from "./context";

import Login from "./components/Login/Login";
import md5 from "blueimp-md5";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  const [popupSettings, setPopupSettings] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const CORRECT_HASH = "da4fd8a50d64f47b1bac8b9a28e787cc";
  const CORRECT_HASH2 = "babe082f9d166717eec81e588c662b97";
  const LOCAL_KEY = "siteAccessHash";
  const checkUserAuth = async () => {
    try {
      // const user = await BaseAPI.getUser();

      const storedHash = localStorage.getItem(LOCAL_KEY);

      if (
        storedHash &&
        (storedHash === CORRECT_HASH || storedHash === CORRECT_HASH2)
      ) {
        setIsAuth(true);
      }
      // const token = await BaseAPI.getToken();

      // if (user) {
      //   setIsAuth(true);
      // }
    } catch (error) {}
  };
  const login = async (n, p) => {
    const inputHash = md5(p);
    if (inputHash === CORRECT_HASH) {
      localStorage.setItem(LOCAL_KEY, inputHash);
      setIsAuth(true);
    }

    // if (!isEmailValid(n)) {
    //   setPopup.error("email is invalid");
    //   setErr("email is invalid");
    //   return;
    // }
    // if (!password) {
    //   setPopup.error("password is empty");
    //   setErr("password is empty");
    //   return;
    // }
    // try {
    // let response = await BaseAPI.login(n, p);
    // setIsAuth(true);
    // } catch (error) {}
  };
  useEffect(() => {
    checkUserAuth();
  }, []);
  return (
    <PopupContext.Provider value={{ popupSettings, setPopupSettings }}>
      <div className="App">
        {isAuth ? (
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        ) : (
          <Login login={login} />
        )}
      </div>
    </PopupContext.Provider>
  );
}
export default App;
