import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import StrAreaVoice from "./StrAreaVoice";
import Draggable from "react-draggable";
import { RiDragMoveFill } from "react-icons/ri";

const VoiceDragable = ({ toJustif, nameF }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <Button onClick={() => setShow(!show)} className="mt-0 mb-0">
        VOICE
      </Button>
      {show && (
        <Draggable handle=".handle1" defaultPosition={{ x: -314, y: 54 }}>
          {/* -767px, 390p */}
          <div ref={ref} className={"voice-drag"}>
            <div className="voice-drag-box">
              <div className="handle1 handle1After">
                {nameF}
                <button
                  className="btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow(false);
                  }}>
                  x
                </button>
                <div className="handle1 hbottom1">
                  <RiDragMoveFill />
                </div>{" "}
              </div>

              <StrAreaVoice
                placeholder="...your notes"
                type="voiceOver"
                actionFn={toJustif}
              />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default VoiceDragable;
