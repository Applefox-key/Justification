import { useState, useRef } from "react";

import Draggable from "react-draggable";
import { RiDragMoveFill } from "react-icons/ri";
import BtnFontSize from "../EditBtns/BtnFontSize";

const WinDragable = ({ title, children, close }) => {
  const [show, setShow] = useState(true);
  const ref = useRef(null);
  const closeWin = (e) => {
    e.stopPropagation();

    setShow(false);
    close();
  };
  return (
    <>
      {show && (
        <Draggable handle=".handle1" defaultPosition={{ x: 0, y: 60 }}>
          {/* -767px, 390p */}
          <div ref={ref} className={"div-drag"}>
            <div className="div-drag-box">
              <div className="handle1">
                {" "}
                {title}
                <button className="btn-back" onClick={closeWin}>
                  x
                </button>{" "}
                {/* <div className="field-name-voice "> {title}</div> */}
              </div>{" "}
              <div className="handle1 hbottom1">
                <BtnFontSize nameV="--font-size-winDr" small />
                <RiDragMoveFill />
              </div>
              <div className="win-body">{children}</div>
              {/* <StrAreaVoice placeholder="...your notes" type="voiceOver" actionFn={toJustif} /> */}
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default WinDragable;
