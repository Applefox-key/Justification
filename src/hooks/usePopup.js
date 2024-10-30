import { useContext } from "react";
import { PopupContext } from "../context";

export const usePopup = () => {
  // eslint-disable-next-line no-unused-vars
  const { popupSetting, setPopupSettings } = useContext(PopupContext);
  const popupMessage = (message) => {
    setPopupSettings(message);
  };
  return popupMessage;
};
