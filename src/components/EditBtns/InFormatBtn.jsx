import { Button } from "react-bootstrap";
import React from "react";
import { baseFormatChanges } from "../../utils/utilStr";

const InFormatBtn = ({ setHandleTxt, fieldid }) => {
  return (
    <div className="format-btns">
      <Button className="btnToHis">Format</Button>
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
