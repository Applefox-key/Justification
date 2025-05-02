import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { MdOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";

const BoxSizeBtn = ({ id, callback, isFullScreen }) => {
  useEffect(() => {
    const newV =
      document.documentElement.style.getPropertyValue("--edit-width") ===
      "100vw";
    if (newV && newV !== isFullScreen) {
      if (callback) callback(newV);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // document.documentElement.style.getPropertyValue("--edit-width");
  const handleClick = () => {
    const elem = document.getElementById(id);
    const newV = !isFullScreen;
    const docStyle = document.documentElement.style;
    if (newV) {
      elem.style.transform = "translate(0px, 0px)";
      docStyle.setProperty("--box-position", "absolute");
      docStyle.setProperty("--edit-width", "100vw");
      docStyle.setProperty("--r3-max-height", "250px");
      docStyle.setProperty("--edit-max-height", "100vh");
      docStyle.setProperty("--box-position-points", "0");
      docStyle.setProperty("--edit-AreaMax-padding", "10px");
      docStyle.setProperty("--edit-AreaMax-height", "70vh");
    } else {
      docStyle.setProperty("--box-position", "relative");
      docStyle.setProperty("--edit-width", "72vw");
      docStyle.setProperty("--r3-max-height", "150px");
      docStyle.setProperty("--edit-max-height", "550px");
      docStyle.setProperty("--box-position-points", "absolute");

      docStyle.setProperty("--edit-AreaMax-padding", "0px");
      docStyle.setProperty("--edit-AreaMax-height", "360px");
    }

    if (callback) callback(newV);
  };

  return (
    <Button className="btn-back" onClick={handleClick}>
      {isFullScreen ? <MdOutlineCloseFullscreen /> : <MdOpenInFull />}
    </Button>
  );
};

export default BoxSizeBtn;
