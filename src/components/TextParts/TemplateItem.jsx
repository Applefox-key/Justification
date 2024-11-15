import React, { useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import { TbMessageLanguage } from "react-icons/tb";

const TemplateItem = ({ el, onContextMenu, onMouseDown }) => {
  const [showAlt, setShowAlt] = useState(false);
  return (
    <div className="current-item-txt" onContextMenu={onContextMenu}>
      {!!el.note && <span>{!!el.note && el.note}</span>}
      <button className="btnCopyTxt" onClick={onMouseDown} title="copy">
        <LuClipboardCopy />
      </button>
      {el.ru && (
        <button
          className={showAlt ? "isTmp" : ""}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowAlt(!showAlt);
          }}>
          <TbMessageLanguage />
          {/* {showAlt ? "s2" : "s1"} */}
        </button>
      )}
      {<div>{showAlt ? el.ru : el.en}</div>}
    </div>
  );
};

export default TemplateItem;
