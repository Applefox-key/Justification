import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import StrAreaVoice from "./StrAreaVoice";
import Draggable from "react-draggable";

const VoiceDragable = ({ toJustif, nameF }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <Button onClick={() => setShow(!show)} className="mt-0 mb-0">
        VOICE
      </Button>
      {show && (
        <Draggable defaultPosition={{ x: -750, y: -90 }}>
          {/* -767px, 390p */}
          <div ref={ref} className={"voice-drag"}>
            <div className="voice-drag-box">
              <div className="handle1 ">
                {nameF}{" "}
                <button
                  className="btn-back"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow(false);
                  }}>
                  x
                </button>
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
