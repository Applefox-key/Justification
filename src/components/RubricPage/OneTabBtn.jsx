import React from "react";

const OneTabBtn = ({ activeTab, setAct, titleID, title, children }) => {
  return (
    <div
      className={
        activeTab && activeTab.short === titleID
          ? "oneTab activeTab"
          : "oneTab "
      }
      onClick={(e) => setAct({ short: titleID })}>
      <span>{title || titleID}</span>
      {children}
    </div>
  );
};

export default OneTabBtn;
