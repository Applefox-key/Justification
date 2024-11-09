import React, { useState } from "react";
import "./App.scss";
import MainPage from "./components/MainPage";
import { PopupContext } from "./context";

function App() {
  const [popupSettings, setPopupSettings] = useState("");
  return (
    <PopupContext.Provider value={{ popupSettings, setPopupSettings }}>
      <div className="App">
        <MainPage />
      </div>
    </PopupContext.Provider>
  );
}

export default App;
