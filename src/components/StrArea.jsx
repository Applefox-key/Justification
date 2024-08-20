import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../utils/localStorage";
import { copyToClipboard, replaceWords } from "../utils/utilStr";
import VoiceEnter from "./VoiceEnter";
import { startOrStopV } from "../utils/speech";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBack2Line } from "react-icons/ri";

const StrArea = ({ str = "", actionFn, placeholder = "", type = "edit" }) => {
  const [handleTxt, setHandleTxt] = useState(str);
  const handleChange = (e) => {
    e.stopPropagation();
    setHandleTxt(e.target.value);
  };

  const onOK = (e) => {
    e.stopPropagation();
    let txt = handleTxt;
    if (type === "voice" || type === "voiceOver") {
      txt = replaceWords(txt);
    }
    const val = { en: txt };
    if (!!actionFn) actionFn(val);
    setHandleTxt("");
  };

  const fragmentPage = () => {
    return (
      <>
        <Form.Control
          as="textarea"
          id={type === "voice" || type === "voiceOver" ? "voice" : type}
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
        {type === "editbox" && (
          <>
            <Button
              className="btnToHis"
              onClick={(e) => saveToHistory({ en: handleTxt, ru: "" })}>
              to history
            </Button>{" "}
            <Button
              className="btnToHis"
              onClick={(e) => copyToClipboard(handleTxt)}>
              copy
            </Button>
          </>
        )}
        {!!actionFn && <Button onClick={onOK}>OK</Button>}{" "}
        {type === "voice" && (
          <button
            className="square-btn intense"
            title="add a dot"
            onClick={() => setHandleTxt(handleTxt + ".")}>
            .
          </button>
        )}
        {(type === "voice" || type === "voiceOver") && (
          <VoiceEnter onChange={setHandleTxt} />
        )}
        {type === "editbox" && (
          <Button onClick={() => setHandleTxt("")}>clear</Button>
        )}{" "}
        {type !== "editbox" && (
          <Button onClick={() => setHandleTxt("")}>
            <RiDeleteBack2Line />
          </Button>
        )}
        {/* {type === "editbox" && <TxtBtns toJustif={toJustif} />} */}
      </>
    );
  };

  return (
    <>
      {type === "voice" || type === "voiceOver" ? (
        <div
          className={type}
          onMouseDown={(e) => {
            if (e.button === 1) {
              e.preventDefault();
              e.stopPropagation();
              startOrStopV(setHandleTxt);
            }
          }}>
          {/* {!!handleTxt && <div className="justif-all asText">{handleTxt}</div>} */}
          <div className="textarea-box">{fragmentPage()}</div>
        </div>
      ) : (
        fragmentPage()
      )}
    </>
  );
};

export default StrArea;
