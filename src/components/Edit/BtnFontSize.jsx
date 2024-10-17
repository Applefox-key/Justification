import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const BtnFontSize = () => {
  const [font, setFont] = useState(1.8);
  const setVerticalCardFonrSize = (prop = "") => {
    if (prop) {
      document.documentElement.style.setProperty(
        "--vertical-font",
        prop + "rem"
      );
    }
  };
  const setSize = (val) => {
    const newValue = Math.min(Math.max(font + val, 1.0), 2.8);
    setFont(newValue);
    setVerticalCardFonrSize(newValue);
  };
  return (
    <>
      <button
        // className="square-btn intense"
        className="btn-back"
        title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
        onClick={() => setSize(-0.1)}>
        <FiMinus />
      </button>{" "}
      <button
        // className="square-btn intense"
        className="btn-back"
        title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
        onClick={() => setSize(0.1)}>
        <FiPlus />
      </button>{" "}
    </>
  );
};

export default BtnFontSize;
