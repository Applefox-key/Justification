import { Button } from "react-bootstrap";
import React from "react";
import {
  applyAction,
  numIsteadLetter,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";
import { PiSquareHalfDuotone } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";

const FormatBtn = ({ handleTxt, action, setHandleTxt }) => {
  const respOrder = (e) => {
    const newVal = replaceWords(handleTxt);
    setHandleTxt(newVal);
  };
  return (
    <div className="format-btns">
      <Button
        className="btnToHis"
        onClick={(e) => {
          const newVal = applyAction(handleTxt, action);
          setHandleTxt(newVal);
        }}>
        FORMAT (F2)
      </Button>
      <div className="sub-btns">
        <button
          className="btnToHis intense"
          title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
          onClick={respOrder}>
          Responce A Responce B{/* <PiSquareHalfDuotone /> */}
        </button>
        <button
          className="btnToHis intense"
          title="INTERACTIONS: remove extra spaces, capitalize all sentences, correct names of INTERACTIONS"
          onClick={(e) => {
            const newVal = replaceWordsInteractions(handleTxt);
            setHandleTxt(newVal);
          }}>
          Interaction A Interaction B{/* <IoChatbubblesOutline /> */}
        </button>
        <button
          className="btnToHis intense"
          title="@RESPONSES: A B -> 1 2"
          onClick={() => numIsteadLetter(handleTxt, setHandleTxt)}>
          @Responce A @Responce B
        </button>
      </div>
    </div>
  );
};

export default FormatBtn;
