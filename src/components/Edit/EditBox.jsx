import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import BtnFontSize from "./BtnFontSize";
import { BsCardText } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { splitString } from "../../utils/utilStr";
import EditArea from "../EditParts/EditArea";
import TextChecker from "../UI/TextChecker";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import StrAreaEdit from "./StrAreaEdit";
import { LiaSquare } from "react-icons/lia";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TfiViewGrid } from "react-icons/tfi";

const EditBox = ({ el, setEdit, savefn }) => {
  const [isСheckerMode, setIsCheckerMode] = useState(false);
  const [isOneFieldMode, setIsOneFieldMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [handleTxt, setHandleTxt] = useState(el.en);
  const [item, setItem] = useState(splitString(el.en));
  const [action, setAction] = useState("@R");

  useEffect(() => {
    const itm = splitString(el.en);
    const newVal = localStorage.getItem("lastAction") || "@R";
    setItem(itm);
    if (newVal !== action) setAction(newVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="module-wrap-edit">
      <div className="editbox-wrap">
        <Draggable disabled={isFullScreen} handle=".handle">
          <div
            className="editbox "
            onClick={(e) => e.stopPropagation()}
            id="editbox">
            <div className="handle">
              <div className="d-flex align-items-center">
                <button
                  className="square-btn hotBtnGr rel-left"
                  onClick={() => {
                    const newval =
                      action === "@R" ? "RAB" : action === "RAB" ? "INT" : "@R";
                    localStorage.setItem("lastAction", newval);
                    setAction(newval);
                  }}>
                  {action}
                </button>

                <BtnFontSize />
              </div>
              <h5>EDIT COMMENT</h5>
              <div>
                <Button
                  className="btn-back"
                  onClick={() => setIsCheckerMode(!isСheckerMode)}>
                  {isСheckerMode ? (
                    <BsCardText />
                  ) : (
                    <IoCheckmarkDoneCircleOutline />
                  )}
                </Button>{" "}
                <Button
                  className="btn-back"
                  title="window mode: one or several text fields"
                  onClick={() => setIsOneFieldMode(!isOneFieldMode)}>
                  {/* {isOneFieldMode ? <BsWindowSplit /> : <LiaSquare />} */}
                  {isOneFieldMode ? <LiaSquare /> : <TfiViewGrid />}
                </Button>
                <BoxSizeBtn id="editbox" callback={setIsFullScreen} />
                <Button
                  className="btn-backXl"
                  onClick={() => {
                    if (window.confirm("Quit without changies?")) setEdit(null);
                  }}>
                  <IoIosClose />
                </Button>
              </div>
            </div>
            <div className="txt-box ">
              {isСheckerMode ? (
                <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
              ) : isOneFieldMode ? (
                <StrAreaEdit
                  handleTxt={handleTxt}
                  setHandleTxt={setHandleTxt}
                  actionFn={savefn}
                  action={action}
                />
              ) : (
                <EditArea
                  item={item}
                  setItem={setItem}
                  actionFn={savefn}
                  action={action}
                  setIsCheckerMode={setIsCheckerMode}
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
