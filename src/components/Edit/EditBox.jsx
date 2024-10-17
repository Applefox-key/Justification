import React, { useState } from "react";
import { Button } from "react-bootstrap";
import StrAreaEdit from "./StrAreaEdit";
import Draggable from "react-draggable";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import { IoIosClose } from "react-icons/io";
import TextChecker from "../UI/TextChecker";
import { BsCardText, BsPatchCheck } from "react-icons/bs";
import BtnFontSize from "./BtnFontSize";

const EditBox = ({ el, setEdit, savefn }) => {
  const [ischeckerMode, setIsCheckerMode] = useState(false);
  const [handleTxt, setHandleTxt] = useState(el.en);
  return (
    <div className="module-wrap">
      <div className="editbox-wrap">
        <Draggable handle=".handle">
          <div className="editbox" onClick={(e) => e.stopPropagation()}>
            <div className="handle">
              EDIT COMMENT
              <div>
                <BtnFontSize />
                <Button
                  className="btn-back"
                  onClick={() => setIsCheckerMode(!ischeckerMode)}>
                  {ischeckerMode ? <BsCardText /> : <BsPatchCheck />}
                </Button>
                <BoxSizeBtn />
                <Button className="btn-backXl" onClick={() => setEdit(null)}>
                  <IoIosClose />
                </Button>
              </div>
            </div>
            <div className="txt-box ">
              {ischeckerMode ? (
                <TextChecker />
              ) : (
                <StrAreaEdit
                  handleTxt={handleTxt}
                  setHandleTxt={setHandleTxt}
                  actionFn={savefn}
                />
              )}
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default EditBox;
