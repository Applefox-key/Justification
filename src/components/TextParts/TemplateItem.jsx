import React, { useState } from "react";

const TemplateItem = ({ el, onContextMenu, onMouseDown }) => {
  const [showAlt, setShowAlt] = useState(false);
  return (
    <div className="current-item-txt" onContextMenu={onContextMenu}>
      <span>{!!el.note && el.note}</span>
      <button className="btnCopyTxt" onClick={onMouseDown}>
        copy
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowAlt(!showAlt);
        }}>
        {showAlt ? "note2" : "note1"}
      </button>
      <div>{showAlt ? el.ru : el.en}</div>
    </div>
  );
};

export default TemplateItem;
