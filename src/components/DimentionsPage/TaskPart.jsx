import React, { useState } from "react";
import { RiArrowRightWideLine } from "react-icons/ri";

const TaskPart = ({ title, children }) => {
  const [opened, setOpened] = useState(true);
  const switchOpen = () => {
    setOpened(!opened);
  };
  return (
    <div>
      <div
        className="menu-accent d-flex justify-content-between w-100"
        onClick={switchOpen}>
        <span>{title}</span>{" "}
        {!!children && (
          <RiArrowRightWideLine className={opened ? "arr-down" : ""} />
        )}
      </div>
      {opened && <>{children}</>}
    </div>
  );
};

export default TaskPart;
