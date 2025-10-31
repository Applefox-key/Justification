import { useEffect } from "react";

export const useOutsideClick = (ref, callback, isAddListener = true) => {
  useEffect(() => {
    if (!ref || !callback || !isAddListener) return;

    const handleOutsideClick = (event) => {
      console.log("click outside check", ref.current, event.target);

      if (ref.current && !ref.current.contains(event.target)) {
        console.log("Clicked outside! Calling callback");
        callback();
      }
    };

    // Add listener on next tick to avoid catching the same click that triggered opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback, isAddListener]);
};
