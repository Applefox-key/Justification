import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import BtnFontSize from "./BtnFontSize";
import { BsCardText, BsPatchCheck } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { splitString } from "../../utils/utilStr";
import EditArea from "../EditParts/EditArea";
import TextChecker from "../UI/TextChecker";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import StrAreaEdit from "./StrAreaEdit";
import { PiCopySimple } from "react-icons/pi";
import { LiaSquare } from "react-icons/lia";

const EditBox = ({ el, setEdit, savefn }) => {
  const [isСheckerMode, setIsCheckerMode] = useState(false);
  const [isOneFieldMode, setIsOneFieldMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [handleTxt, setHandleTxt] = useState(el.en);
  const [item, setItem] = useState(splitString(el.en));

  const modeText = {
    checker: "check text mode",
    oneField: "one-window mode",
    multiField: "multi-window mode",
  };
  useEffect(() => {
    const itm = splitString(el.en);
    setItem(itm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="module-wrap">
      <div className="editbox-wrap">
        <Draggable disabled={isFullScreen} handle=".handle">
          <div
            className="editbox"
            onClick={(e) => e.stopPropagation()}
            id="editbox">
            <div className="handle">
              <div>
                <Button
                  className="btn-back"
                  onClick={() => setIsOneFieldMode(!isOneFieldMode)}>
                  {isOneFieldMode ? <PiCopySimple /> : <LiaSquare />}
                </Button>
                <BtnFontSize />
              </div>
              <h5>
                EDIT COMMENT
                <span>
                  {isСheckerMode
                    ? modeText.checker
                    : isOneFieldMode
                    ? modeText.oneField
                    : modeText.multiField}
                </span>
              </h5>
              <div>
                <Button
                  className="btn-backXl"
                  onClick={() => setIsCheckerMode(!isСheckerMode)}>
                  {isСheckerMode ? <BsCardText /> : <BsPatchCheck />}
                </Button>
                <BoxSizeBtn id="editbox" callback={setIsFullScreen} />
                <Button className="btn-backXl" onClick={() => setEdit(null)}>
                  <IoIosClose />
                </Button>
              </div>
            </div>
            <div className="txt-box ">
              {isСheckerMode ? (
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
