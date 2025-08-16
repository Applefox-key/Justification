import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";
import { currentBack } from "../../utils/localStorage";
import { imgCount } from "../../constants/images";
import OneImg from "./OneImg";
import { getTheme, changeTheme } from "../../utils/thema";
import { GoMoon, GoSun } from "react-icons/go";

const ThemeBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curImg, setCurImg] = useState(currentBack());
  const images = Array.from({ length: imgCount }, (_, i) => i);
  const [isCheckedDay, setIsCheckedDay] = useState(true);
  let theme = getTheme();
  useEffect(() => {
    let theme = getTheme();
    if (theme !== "day") {
      setIsCheckedDay(false);
      changeTheme(false);
    }
  }, [theme]);
  const handleChange = (e) => {
    e.stopPropagation();
    changeTheme(!isCheckedDay);
    setIsCheckedDay(!isCheckedDay);
  };
  return (
    <div className="backgr">
      {/* <IoIosImages onClick={() => setIsOpen(true)} /> */}
      <div onClick={() => setIsOpen(true)}>
        {isCheckedDay ? <GoSun /> : <GoMoon />}
        {/* <BsMoon onClick={() => setIsOpen(true)} /> */}
      </div>
      {isOpen && (
        <div className="module-wrap">
          <div className="editbox-wrap z900">
            <Draggable handle=".handle">
              <div className="editbox" onClick={(e) => e.stopPropagation()}>
                <div className="handle">
                  IMG{" "}
                  <label className="themeSwitch">
                    <input
                      type="checkbox"
                      checked={isCheckedDay}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="slider"></span>
                  </label>
                  <Button className="btn-back" onClick={() => setIsOpen(false)}>
                    <IoIosClose />
                  </Button>
                </div>

                <div className="image-grid">
                  {images.length === imgCount &&
                    images.map((image, index) => (
                      <OneImg
                        index={index}
                        setCurImg={setCurImg}
                        curImg={curImg}
                      />
                    ))}
                </div>
              </div>
            </Draggable>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeBox;
