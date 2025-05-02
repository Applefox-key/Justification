import React, { useEffect, useState } from "react";
import "./App.scss";
import MainPage from "./components/MainPage";
import { PopupContext } from "./context";

function App() {
  const [popupSettings, setPopupSettings] = useState("");
  useEffect(() => {
    // const originalError = console.error;
    // console.error = (...args) => {
    //   if (
    //     typeof args[0] === "string" &&
    //     args[0].includes("ResizeObserver loop")
    //   ) {
    //     // Можно заменить на console.warn или просто игнорировать
    //     console.warn("⚠️ ResizeObserver warning caught:", ...args);
    //     return;
    //   }
    //   originalError(...args);
    // };
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("ResizeObserver loop")
      ) {
        return;
      }
      originalError(...args);
    };
  }, []);
  return (
    <PopupContext.Provider value={{ popupSettings, setPopupSettings }}>
      <div className="App">
        <MainPage />
      </div>
    </PopupContext.Provider>
  );
}

export default App;
