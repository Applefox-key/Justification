import React, { useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistorygeneral } from "../../utils/localStorage";
import FormatBtn from "./FormatBtn";
import { usePopup } from "../../hooks/usePopup";

const TopBtns = ({ statesVal, action = "RAB", type }) => {
  const { handleTxt, setHandleTxt } = statesVal;
  const [autohis, setAutohis] = useState(true);
  const setPopup = usePopup();
  return (
    <>
      <Hint />
      {!type && (
        <div className="his-auto ">
          <Form.Check
            size="sm"
            className="autocheckhis"
            checked={autohis}
            type="checkbox"
            id="inputHis"
            onChange={() => setAutohis(!autohis)}
          />
          <Button
            className="btnToHis"
            disabled={!handleTxt}
            onClick={(e) =>
              saveToHistorygeneral({ en: handleTxt, ru: "" }, setPopup)
            }>
            to history
          </Button>{" "}
        </div>
      )}
      {/* <Button
        className="btnToHis"
        disabled={!handleTxt}
        onClick={() => {
          if (isTxt) setIsTxt(false);
          if (autohis) saveToHistorygeneral({ en: handleTxt, ru: "" },setPopup);
          setHandleTxt("");
        }}>
        clear
      </Button> */}
      <FormatBtn
        handleTxt={handleTxt}
        setHandleTxt={setHandleTxt}
        action={action}
      />{" "}
    </>
  );
};

export default TopBtns;
