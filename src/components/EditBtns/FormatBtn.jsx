import { Button } from "react-bootstrap";
import React from "react";
import { applyAction } from "../../utils/utilStr";
import { HiRefresh } from "react-icons/hi";
import { baseRespName } from "../../constants/replacements";

const FormatBtn = ({ handleTxt, action, setHandleTxt }) => {
  return (
    <div className="format-btns">
      <Button
        className="btnToHis"
        onClick={(e) => {
          const newVal = applyAction(handleTxt, action);
          setHandleTxt(newVal);
        }}>
        {/* FORMAT (F2) */}
        <HiRefresh /> {action} (F2)
      </Button>
      <div className="sub-btns">
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
