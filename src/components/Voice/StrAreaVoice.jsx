import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { replaceWords } from "../../utils/utilStr";
import { TbHttpDelete } from "react-icons/tb";
import VoiceBtns from "./VoiceBtns";
import { stopV } from "../../utils/voice";

const StrAreaVoice = ({ actionFn, placeholder = "", type = "edit" }) => {
  // const [handleTxt, setHandleTxt] = useState(str);
  const textRef = useRef();
  // const handleChange = (e) => {
  //   e.stopPropagation();
  //   setHandleTxt(e.target.value);
  // };
  const onOK = (e) => {
    // e.stopPropagation();
    if (startBtn.current.style.display === "none") {
      stopV(textRef, onchange);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
    let txt = textRef.current.value;
    txt = replaceWords(txt);
    const val = { en: txt };
    if (!!actionFn) actionFn(val);
    textRef.current.value = "";
  };
  const stopBtn = useRef(null);
  const startBtn = useRef(null);
  return (
    <div className={type}>
      <div className="textarea-box">
        <Form.Control
          as="textarea"
          id={"voice"}
          className={type === "editbox" ? "fit-height " : ""}
          rows={1}
          spellCheck="true"
          placeholder={placeholder}
          ref={textRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") onOK(e);
          }}
          // onChange={handleChange}
        />
        {!!actionFn && <Button onClick={onOK}>OK</Button>}
        <VoiceBtns textRef={textRef} stopBtn={stopBtn} startBtn={startBtn} />
        <Button onClick={() => (textRef.current.value = "")} className="delbtn">
          <TbHttpDelete />
        </Button>
      </div>
    </div>
  );
};

export default StrAreaVoice;
