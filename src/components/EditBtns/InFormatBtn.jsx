import { Button } from "react-bootstrap";
import React from "react";
import { applyAction, baseFormatChanges } from "../../utils/utilStr";
import { HiRefresh } from "react-icons/hi";

const InFormatBtn = ({ handleTxt, action, setHandleTxt, fieldid }) => {
  return (
    <div className="format-btns">
      <Button
        className="btnToHis"
        // onClick={(e) => {
        //   const newVal = applyAction(handleTxt, action);
        //   setHandleTxt(newVal);
        // }}
      >
        Format
      </Button>
      <div className="sub-btns">
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
      </div>
    </div>
  );
};

export default InFormatBtn;
