import React, { useEffect, useState } from "react";
// import "./tgb.scss";

import { getTheme, changeTheme } from "../utils/thema";

const ThemeSwitch = ({ isPlay }) => {
  const [isCheckedDay, setIsCheckedDay] = useState(true);
  useEffect(() => {
    let theme = getTheme();
    if (theme !== "day") {
      setIsCheckedDay(false);
      changeTheme(false);
    }
  }, []);
  const handleChange = (e) => {
    e.stopPropagation();
    changeTheme(!isCheckedDay);
    setIsCheckedDay(!isCheckedDay);
  };

  return (
    <>
      <label className="themeSwitch">
        <input
          type="checkbox"
          checked={isCheckedDay}
          onChange={(e) => handleChange(e)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default ThemeSwitch;
