import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../utils/localStorage";
import { copyToClipboard } from "../utils/utilStr";
import VoiceEnter from "./VoiceEnter";

const StrArea = ({ str = "", actionFn, placeholder = "", type = "edit" }) => {
  const [handleTxt, setHandleTxt] = useState(str);
  const handleChange = (e) => {
    e.stopPropagation();

    setHandleTxt(e.target.value);
  };

  const onOK = (e) => {
    e.stopPropagation();
    const val = { en: handleTxt };
    if (!!actionFn) actionFn(val);
    setHandleTxt("");
  };

  const fragmentPage = () => {
    return (
      <>
        <Form.Control
          as="textarea"
          id={type}
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
              save to history
            </Button>{" "}
            <Button
              className="btnToHis"
              onClick={(e) => copyToClipboard(handleTxt)}>
              copy
            </Button>
          </>
        )}
        {!!actionFn && <Button onClick={onOK}>OK</Button>}{" "}
        {type !== "editbox" && (
          <Button onClick={() => setHandleTxt("")}>✖️</Button>
        )}
        {type === "voice" && <VoiceEnter onChange={setHandleTxt} />}
        {type === "editbox" && (
          <Button onClick={() => setHandleTxt("")}>clear</Button>
        )}{" "}
        {/* {type === "editbox" && <TxtBtns toJustif={toJustif} />} */}
      </>
    );
  };

  return (
    <>
      {type === "voice" ? (
        <div>
          {!!handleTxt && <div className="justif-all asText">{handleTxt}</div>}
          <div className="textarea-box  mb-2">{fragmentPage()}</div>
        </div>
      ) : (
        fragmentPage()
      )}
    </>
  );
};

export default StrArea;
