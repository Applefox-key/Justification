import React, { useEffect, useState } from "react";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

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
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(nameV),
        2
      ) || 1.2;
    if (size !== font) setFont(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="btns-font-size">
      <div className="buttons">
        <button title="Font size +" onClick={() => setSize(0.1)}>
          <IoMdArrowDropup />
        </button>{" "}
        <button title="Font size -" onClick={() => setSize(-0.1)}>
          <IoMdArrowDropdown />
        </button>
      </div>
      F
      <div className="font-size-manage">
        <span> {font.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default BtnFontSize;
