import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";

const BoxSizeBtn = ({ id, callback }) => {
  // const [isFull, setIsFull] = useState(false);
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const newV =
      document.documentElement.style.getPropertyValue("--edit-width") ===
      "100vw";
    if (newV && newV !== isFull) {
      setIsFull(true);
      if (callback) callback(newV);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // document.documentElement.style.getPropertyValue("--edit-width");
  const handleClick = () => {
    const elem = document.getElementById(id);
    const newV = !isFull;
    if (isFull) {
      document.documentElement.style.setProperty("--box-position", "relative");
      document.documentElement.style.setProperty("--edit-width", "72vw");
      document.documentElement.style.setProperty("--r3-max-height", "150px");
      document.documentElement.style.setProperty("--edit-max-height", "550px");
      document.documentElement.style.setProperty(
        "--box-position-points",
        "unset"
      );
      document.documentElement.style.setProperty(
        "--edit-AreaMax-padding",
        "0px"
      );
      document.documentElement.style.setProperty(
        "--edit-AreaMax-height",
        "360px"
      );
    } else {
      elem.style.transform = "translate(0px, 0px)";
      document.documentElement.style.setProperty("--box-position", "absolute");
      document.documentElement.style.setProperty("--edit-width", "100vw");
      document.documentElement.style.setProperty("--r3-max-height", "250px");
      document.documentElement.style.setProperty("--edit-max-height", "100vh");
      document.documentElement.style.setProperty("--box-position-points", "0");
      document.documentElement.style.setProperty(
        "--edit-AreaMax-padding",
        "10px"
      );
      document.documentElement.style.setProperty(
        "--edit-AreaMax-height",
        "70vh"
      );
    }
    setIsFull(newV);
    if (callback) callback(newV);
  };

  return (
    <Button className="btn-back" onClick={handleClick}>
      {/* {isFull ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />} */}
      {isFull ? <MdOutlineCloseFullscreen /> : <MdOpenInFull />}
    </Button>
  );
};

export default BoxSizeBtn;
