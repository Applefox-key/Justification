import React, { useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../../utils/localStorage";
import FormatBtn from "./FormatBtn";
import { usePopup } from "../../hooks/usePopup";

const TopBtns = ({ fieldid, statesVal, action = "RAB", type }) => {
  const { handleTxt, setHandleTxt, isTxt, setIsTxt } = statesVal;
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
            onClick={(e) => {
              saveToHistory({ en: handleTxt, ru: "" });
              setPopup("info has been added to the history");
            }}>
            to history{" "}
          </Button>{" "}
        </div>
      )}
      {/* <Button
        className="btnToHis"
        disabled={!handleTxt}
        onClick={() => {
          if (isTxt) setIsTxt(false);
          if (autohis) saveToHistory({ en: handleTxt, ru: "" });
          setPopup("info has been added to the history");
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
