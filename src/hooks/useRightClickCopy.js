import { useCallback } from "react";
import { copyToClipboard } from "../utils/utilStr"; // твоя функция
import { usePopup } from "../hooks/usePopup";

// export const useRightClickCopy = () => {
//   const setPopup = usePopup();

//   const handleRightClick = useCallback((e, text) => {
//     e.preventDefault(); // запрещаем контекстное меню

//     if (text) {
//       copyToClipboard(text);
//       setPopup("Copied to clipboard!");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return handleRightClick;
// };
export const useRightClickCopy = (getText) => {
  const setPopup = usePopup();

  const handleRightClick = useCallback(
    (e, ...args) => {
      e.preventDefault(); // запрещаем контекстное меню
      e.stopPropagation();
      let text;

      if (typeof getText === "function") {
        text = getText(...args);
      } else {
        text = args[0]; // если getText не передан, первый аргумент — текст
      }

      if (text) {
        copyToClipboard(text);
        setPopup("Copied to clipboard!");
      }
    },
    [getText, setPopup]
  );

  return handleRightClick;
};
