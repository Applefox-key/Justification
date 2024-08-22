import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { replaceWords } from "../../utils/utilStr";
import { startOrStopV } from "../../utils/speech";
import { RiDeleteBack2Line } from "react-icons/ri";
import VoiceEnter from "./VoiceEnter";
import { TbHttpDelete } from "react-icons/tb";

const StrArea = ({ str = "", actionFn, placeholder = "", type = "edit" }) => {
  const [handleTxt, setHandleTxt] = useState(str);
  const handleChange = (e) => {
    e.stopPropagation();
    setHandleTxt(e.target.value);
  };
  const onOK = (e) => {
    e.stopPropagation();
    let txt = handleTxt;
    txt = replaceWords(txt);
    const val = { en: txt };
    if (!!actionFn) actionFn(val);
    setHandleTxt("");
  };

  return (
    <div
      className={type}
      onMouseDown={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          e.stopPropagation();
          startOrStopV(setHandleTxt);
        }
      }}>
      <div className="textarea-box">
        <Form.Control
          as="textarea"
          id={"voice"}
          className={type === "editbox" ? "fit-height " : ""}
          rows={1}
          spellCheck="true"
          placeholder={placeholder}
          value={handleTxt}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") onOK(e);
          }}
          onChange={handleChange}
        />
        {!!actionFn && <Button onClick={onOK}>OK</Button>}
        <VoiceEnter onChange={setHandleTxt} />
        <Button onClick={() => setHandleTxt("")} className="delbtn">
          <TbHttpDelete />
        </Button>
      </div>
    </div>
  );
};

export default StrArea;
