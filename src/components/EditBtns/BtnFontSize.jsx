import React, { useEffect, useState } from "react";
import { TbLetterF, TbLetterFSmall } from "react-icons/tb";

const BtnFontSize = ({ nameV = "--vertical-font" }) => {
  const [font, setFont] = useState(0.7);
  const setVerticalCardFonrSize = (prop = "") => {
    if (prop) {
      document.documentElement.style.setProperty(nameV, prop + "rem");
    }
  };
  const setSize = (val) => {
    const newValue = Math.min(Math.max(font + val, 0.6), 2.8);
    setFont(newValue);
    setVerticalCardFonrSize(newValue);
  };
  useEffect(() => {
    const size =
      parseFloat(document.documentElement.style.getPropertyValue(nameV), 2) ||
      1.2;
    if (size !== font) setFont(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {" "}
      <button
        className="btn-back m-0 round-btn"
        title="Font size -"
        onClick={() => setSize(-0.1)}>
        <TbLetterFSmall />
      </button>{" "}
      <button
        className="btn-back hotBtnGr round-btn"
        title="Font size +"
        onClick={() => setSize(0.1)}>
        <TbLetterF />
      </button>{" "}
    </>
  );
};

export default BtnFontSize;
