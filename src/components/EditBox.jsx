import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import StrArea from "./StrArea";
import { saveToHistory } from "../utils/localStorage";

const EditBox = ({ el, setEdit, savefn }) => {
  //   const[handleTxt,setHandleTxt]=

  return (
    <div className="editbox-wrap" onClick={() => setEdit(null)}>
      <div className="editbox" onClick={(e) => e.stopPropagation()}>
        <div className="txt-box ">
          <StrArea
            str={el.en}
            his
            actionFn={(handleTxt) => {
              savefn(handleTxt);
            }}
          />
        </div>{" "}
        <Button className="w100" onClick={() => setEdit(null)}>
          BACK
        </Button>
        {/* <Button className="btnToHis" onClick={(e) => saveToHistory(el.en)}>
          save to history
        </Button> */}
      </div>
    </div>
  );
};

export default EditBox;
