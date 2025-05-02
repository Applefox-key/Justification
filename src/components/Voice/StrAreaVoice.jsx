import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { replaceWords } from "../../utils/utilStr";
import { TbHttpDelete } from "react-icons/tb";
import VoiceBtns from "./VoiceBtns";
import { stopV } from "../../utils/voice";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

const StrAreaVoice = ({ actionFn, placeholder = "", type = "edit" }) => {
  const [isRepl, setIsRepl] = useState(true);
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
    if (isRepl) txt = replaceWords(txt);
    const val = { en: txt };
    if (!!actionFn) actionFn(val);
    textRef.current.value = "";
  };
  const stopBtn = useRef(null);
  const startBtn = useRef(null);
  return (
    <div className={type}>
      <div onClick={() => setIsRepl(!isRepl)} className="box-hov">
        {isRepl ? (
          <MdOutlineRadioButtonChecked />
        ) : (
          <MdOutlineRadioButtonUnchecked />
        )}{" "}
        format text when pasting
      </div>
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
        <div className="voice-btns-all">
          {" "}
          <VoiceBtns
            textRef={textRef}
            stopBtn={stopBtn}
            startBtn={startBtn}
          />{" "}
          <Button
            onClick={() => (textRef.current.value = "")}
            className="delbtn">
            <TbHttpDelete />
          </Button>{" "}
          {!!actionFn && <Button onClick={onOK}>OK</Button>}{" "}
        </div>
      </div>
    </div>
  );
};

export default StrAreaVoice;
