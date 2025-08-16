import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MyPortal = ({ children, containerId = "portal-root" }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const el = document.getElementById(containerId);
    setContainer(el);
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};

export default MyPortal;
