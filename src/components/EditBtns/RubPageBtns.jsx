import React from "react";

import { Button } from "react-bootstrap";

import { voiceToEdit } from "../../utils/utilStr";

import RubArchive from "../Rubrics/RubArchive";
import { defaultRubJust } from "../../constants/rubricsTemplates";

import VoiceDragable from "../Voice/VoiceDragable";
import Hint from "../Hint/Hint";
import HistoryBtn from "../UI/HistoryBtn";

const RubPageBtns = ({
  fieldFn,
  fieldid,
  statesVal,
  onOK,
  clear,
  action = "RAB",
}) => {
  const { item, setItem } = statesVal;

  const toJustif = (txt) => {
    const textVal = fieldFn.getFieldValue(fieldid);
    voiceToEdit(txt, textVal, fieldFn.setNewVal, fieldid);
  };
  return (
    <div className="d-flex  align-items-center">
      <RubArchive
        txt={item}
        setTxt={(val) => {
          setItem({ ...defaultRubJust, ...val });
        }}
      />
      <VoiceDragable nameF={fieldid} toJustif={toJustif} />
      <button title="clear justifications" onClick={(e) => clear(e, true)}>
        X JUSTIF
      </button>{" "}
      {/* <button onClick={fieldFn.clearAll}>NEW</button> */}
      <button onClick={clear}>NEW</button>{" "}
      <HistoryBtn
        type="RUB"
        load={(val) => {
          setItem({ ...defaultRubJust, ...val });
        }}
      />
      <Hint />
      {onOK && (
        <Button className="btnToHis" onClick={onOK}>
          OK
        </Button>
      )}
    </div>
  );
};

export default RubPageBtns;
