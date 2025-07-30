import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { findAndReplace } from "../../utils/utilStr";
import Draggable from "react-draggable";
import { RiDragMoveFill } from "react-icons/ri";

const ReplaceBtn = ({ setHandleTxt, fieldid }) => {
  const [show, setShow] = useState(false);
  const [find, setFind] = useState("");
  const [repl, setRepl] = useState("");
  const replaceTxt = () => {
    const nv = findAndReplace(fieldid, find.trim(), repl.trim());
    setHandleTxt(nv);
  };

  return (
    <div className="format-btns repl-z">
      <Button
        className="btnToHis"
        onClick={(e) => {
          setShow(!show);
        }}>
        Replace
      </Button>

      {show && (
        <Draggable handle=".handleR" defaultPosition={{ x: -314, y: 54 }}>
          {/* -767px, 390p */}
          <div className={"voice-drag"}>
            <div className="voice-drag-box">
              <div
                className="handleR handle1After commonDr"
                data-title="FIND & REPLACE">
                {fieldid}
                <button
                  className="btn-back buttonX"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow(false);
                  }}>
                  x
                </button>
              </div>
              <Form.Control
                as="input"
                autoFocus
                className={"fieldRub "}
                rows={1}
                spellCheck
                placeholder={"find"}
                value={find}
                onChange={(e) => setFind(e.target.value)}
                // onKeyDown={fieldFn.onKeyDown}
                // onChange={handleChange}
              />
              <Form.Control
                as="input"
                className={"fieldRub "}
                rows={1}
                spellCheck
                placeholder={"replace"}
                value={repl}
                // onKeyDown={fieldFn.onKeyDown}
                onChange={(e) => setRepl(e.target.value)}
              />
              <div className="handleR handleBottom">
                <button onClick={replaceTxt}>REPLACE</button>
                <RiDragMoveFill />
              </div>{" "}
              {/* <StrAreaVoice
                      placeholder="...your notes"
                      type="voiceOver"
                      actionFn={toJustif}
                    /> */}
            </div>
          </div>
        </Draggable>
      )}
      <br />
      {/* <div className="sub-btns">
        {Object.entries(baseFormatChanges).map(([key, config]) => (
          <button
            key={key}
            className="btnToHis intense"
            title={`${key} transformation`}
            onClick={() => {
              const newVal = config.fn(fieldid);
              setHandleTxt(newVal);
            }}>
            {config.name}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default ReplaceBtn;
