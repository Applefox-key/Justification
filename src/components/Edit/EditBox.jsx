import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import StrAreaEdit from "./StrAreaEdit";
import Draggable from "react-draggable";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import { IoIosClose } from "react-icons/io";
import TextChecker from "../UI/TextChecker";
import { BsCardText, BsPatchCheck } from "react-icons/bs";
import BtnFontSize from "./BtnFontSize";
import { LuAppWindow } from "react-icons/lu";
import { FaRegWindowRestore } from "react-icons/fa";
import EditArea from "../EditParts/EditArea";
import { splitString } from "../../utils/utilStr";

const EditBox = ({ el, setEdit, savefn }) => {
  const [ischeckerMode, setIsCheckerMode] = useState(false);
  const [isOneFieldMode, setIsOneFieldMode] = useState(true);
  const [handleTxt, setHandleTxt] = useState(el.en);
  const [item, setItem] = useState(splitString(el.en));
  useEffect(() => {
    const itm = splitString(el.en);
    if (!itm) setItem(itm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="module-wrap">
      <div className="editbox-wrap">
        <Draggable handle=".handle">
          <div className="editbox" onClick={(e) => e.stopPropagation()}>
            <div className="handle">
              <div>
                <Button
                  className="btn-back"
                  onClick={() => setIsOneFieldMode(!isOneFieldMode)}>
                  {isOneFieldMode ? <LuAppWindow /> : <FaRegWindowRestore />}
                </Button>
                <BtnFontSize />
              </div>
              <h5>
                EDIT COMMENT
                <span>
                  {ischeckerMode
                    ? "check text mode"
                    : isOneFieldMode
                    ? "one-window mode"
                    : "multi-window mode"}
                </span>
              </h5>
              <div>
                <Button
                  className="btn-backXl"
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
              ) : isOneFieldMode ? (
                <StrAreaEdit
                  handleTxt={handleTxt}
                  setHandleTxt={setHandleTxt}
                  actionFn={savefn}
                />
              ) : (
                <EditArea item={item} setItem={setItem} actionFn={savefn} />
              )}
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default EditBox;
