import React, { useEffect, useState } from "react";
import { RiArrowRightWideLine } from "react-icons/ri";

const TaskPart = ({ title, children, defaultShow = true }) => {
  const [opened, setOpened] = useState(defaultShow);
  const switchOpen = () => {
    setOpened(!opened);
  };
  useEffect(() => {
    setOpened(defaultShow);
  }, [defaultShow]);
  return (
    <>
      <div className="menu-accent d-flex justify-content-between w-100" onClick={switchOpen}>
        {title} {!!children && <RiArrowRightWideLine className={opened ? "arr-down" : ""} />}
      </div>
      {opened && <>{children}</>}
    </>
  );
};

export default TaskPart;
