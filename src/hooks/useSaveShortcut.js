import { useEffect } from "react";
const useSaveShortcut = (callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "ы")
      ) {
        e.preventDefault(); // отменяем стандартное сохранение страницы
        callback(); // вызываем переданную функцию
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

export default useSaveShortcut;
