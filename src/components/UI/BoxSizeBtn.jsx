import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { LiaSquare } from "react-icons/lia";
import { PiCopySimple } from "react-icons/pi";

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
    <Button className="btn-backXl" onClick={handleClick}>
      {isFull ? <PiCopySimple /> : <LiaSquare />}
    </Button>
  );
};

export default BoxSizeBtn;
// position: absolute;
// top: 0;
// bottom: 0;
// left: 0;
// right: 0;
// max-width: 100vw;
// max-height: 100vh;
// height: 100vh;
// width: 100vw;
// export default BoxSizeBtn;
