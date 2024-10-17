import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LiaSquare } from "react-icons/lia";
import { PiCopySimple } from "react-icons/pi";

const BoxSizeBtn = () => {
  const [isFull, setIsFull] = useState(
    document.documentElement.style.getPropertyValue("--edit-width") === "95vw"
  );

  document.documentElement.style.getPropertyValue("--edit-width");
  const handleClick = () => {
    if (isFull) {
      document.documentElement.style.setProperty("--edit-width", "72vw");
      document.documentElement.style.setProperty("--edit-max-height", "550px");
      document.documentElement.style.setProperty(
        "--edit-AreaMax-height",
        "360px"
      );
    } else {
      document.documentElement.style.setProperty("--edit-width", "95vw");
      document.documentElement.style.setProperty("--edit-max-height", "90vh");
      document.documentElement.style.setProperty(
        "--edit-AreaMax-height",
        "65vh"
      );
    }
    setIsFull(!isFull);
  };
  return (
    <Button className="btn-backXl" onClick={handleClick}>
      {isFull ? <PiCopySimple /> : <LiaSquare />}
    </Button>
  );
};

export default BoxSizeBtn;
