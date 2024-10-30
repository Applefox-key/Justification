import React, { useContext } from "react";
import { PopupContext } from "../../context";

const Popup = () => {
  const { popupSettings, setPopupSettings } = useContext(PopupContext);

  if (popupSettings)
    setTimeout(() => {
      setPopupSettings("");
    }, 5000);

  return (
    popupSettings && (
      <div className={`message ${!!popupSettings ? "visible" : ""}`}>
        {popupSettings}
      </div>
    )
  );
};

export default Popup;
