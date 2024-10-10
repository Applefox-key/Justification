import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import StrAreaVoice from "./StrAreaVoice";

const VoiceOverlay = ({ toJustif, edit = false }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <div ref={ref} className={"w100 " + (!edit ? "voice-main m-0" : "")}>
        <Button
          onClick={handleClick}
          className={edit ? "w100 m-0" : "vw100 m-0"}>
          VOICE
        </Button>
        <Overlay
          show={show}
          target={target}
          placement={edit ? "top" : "top"}
          container={ref}
          containerPadding={20}>
          <Popover id={"popover-voice" + edit}>
            <StrAreaVoice
              placeholder="...your notes"
              type="voiceOver"
              actionFn={toJustif}
            />
          </Popover>
        </Overlay>
      </div>
    </>
  );
};

export default VoiceOverlay;
