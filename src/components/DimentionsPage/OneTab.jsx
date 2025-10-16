import React, { useState } from "react";
import { RiArrowRightWideLine } from "react-icons/ri";

const OneTab = ({ isActive, onClick, title, children, alwShow }) => {
  const [opened, setOpened] = useState(alwShow);
  return (
    <div
      className={isActive ? "oneTab activeTab" : "oneTab "}
      onClick={onClick}>
      <span>
        {title}{" "}
        {!!children && !alwShow && (
          <RiArrowRightWideLine
            className={opened ? "arr-down" : ""}
            onClick={() => setOpened(!opened)}
          />
        )}
      </span>
      {opened && <>{children}</>}
    </div>
  );
};

export default OneTab;
