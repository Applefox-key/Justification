import React, { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutSideClick";

const DropDownBtnsList2 = ({ children, title, className = "" }) => {
  const [isOpen, setIsopen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setIsopen(false));
  return (
    <div className="drop-down-btns-menu " ref={ref}>
      <button
        className={"main-btn " + className}
        onClick={() => setIsopen(!isOpen)}>
        {title}...
      </button>
      {isOpen && <div className="drop-down-btns">{children}</div>}
    </div>
  );
};

export default DropDownBtnsList2;
