import React from "react";

const OneTab = ({ isActive, onClick, title, children }) => {
  return (
    <div
      className={isActive ? "oneTab activeTab" : "oneTab "}
      onClick={onClick}>
      <span>{title}</span>
      {children}
    </div>
  );
};

export default OneTab;
