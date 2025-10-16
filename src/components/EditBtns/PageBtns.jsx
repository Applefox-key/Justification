import React from "react";

import { Button } from "react-bootstrap";

import { voiceToEdit } from "../../utils/utilStr";

import BtnArchive from "./BtnArchive";
import RubArchive from "../Rubrics/RubArchive";

import VoiceDragable from "../Voice/VoiceDragable";
import Hint from "../Hint/Hint";
import { defaultRubJust } from "../../constants/rubricsTemplates";
import HistoryBtn from "../UI/HistoryBtn";

const PageBtns = ({ fieldid, statesVal, onOK, clear, action = "RAB" }) => {
  const { setHandleTxt, item, setItem, type } = statesVal;

  // const pasteFromClipboard = async () => {
  //   let start = 0;
  //   let end = 0;
  //   const text = await navigator.clipboard.readText();
  //   let newVal = handleTxt + text;
  //   const textarea = document.getElementById(fieldid);

  //   if (textarea !== null) {
  //     start = textarea.selectionStart;
  //     end = textarea.selectionEnd;
  //     newVal = handleTxt.slice(0, start) + text + handleTxt.slice(end);
  //   }

  //   setHandleTxt(newVal);
  // };

  return (
    <div className="d-flex  align-items-center">
      {type === "RUB" ? (
        <RubArchive
          txt={item}
          setTxt={(val) => {
            setItem({ ...defaultRubJust, ...val });
          }}
        />
      ) : (
        <BtnArchive txt={item} setTxt={setItem} type={type} />
      )}
      <VoiceDragable
        nameF={fieldid}
        toJustif={(txt) => {
          voiceToEdit(txt, item[fieldid], setHandleTxt, fieldid);
        }}
      />
      <button title="clear justifications" onClick={(e) => clear(e, true)}>
        X JUSTIF
      </button>{" "}
      <button onClick={clear}>NEW</button> <Hint />
      <HistoryBtn
        type="DIM"
        load={(val) => {
          setItem({ ...defaultRubJust, ...val });
        }}
      />
      {onOK && (
        <Button className="btnToHis" onClick={onOK}>
          OK
        </Button>
      )}
    </div>
  );
};

export default PageBtns;
