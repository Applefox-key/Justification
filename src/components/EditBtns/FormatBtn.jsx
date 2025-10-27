import { Button } from "react-bootstrap";
import React from "react";
import { applyAction, baseRespName } from "../../utils/utilStr";
import { HiRefresh } from "react-icons/hi";

const FormatBtn = ({ handleTxt, action, setHandleTxt }) => {
  return (
    <div className="format-btns">
      <Button
        className="btnToHis"
        onClick={(e) => {
          const newVal = applyAction(handleTxt, action);
          setHandleTxt(newVal);
        }}>
        {/* FORMAT (F4) */}
        <HiRefresh /> {action} (F4)
      </Button>
      <div className="sub-btns left">
        {Object.entries(baseRespName).map(([key, config]) => (
          <button
            key={key}
            className="btnToHis intense"
            title={`${key} transformation`}
            onClick={() => {
              const newVal = config.fn(handleTxt);
              setHandleTxt(newVal);
            }}>
            {config.R1} {config.R2}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatBtn;
