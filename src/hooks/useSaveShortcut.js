import { useEffect } from "react";
const useSaveShortcut = (callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "ы")
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

export default useSaveShortcut;
