import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import BtnFontSize from "./BtnFontSize";
import { BsCardText } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import TextChecker from "../UI/TextChecker";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ThemeBox from "../ImgBack/ThemeBox";
import { defaultDim } from "../../constants/textParts";
import EditAreaDim from "../EditParts/EditAreaDim";
// el, setEdit, savefn

const EditDimBox = ({ setEdit, savefn, el }) => {
  const [isСheckerMode, setIsCheckerMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [item, setItem] = useState(
    el ? { ...defaultDim, ...JSON.parse(el) } : defaultDim
  );
  const [action, setAction] = useState("@R");

  useEffect(() => {
    const newVal = localStorage.getItem("lastAction") || "@R";
    if (newVal !== action) setAction(newVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="module-wrap-edit">
      <div className="editbox-wrap-dim">
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
                <ThemeBox />
                <BtnFontSize />
              </div>{" "}
              <h5>EDIT COMMENT DIMENTIONS</h5>
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
            <div className="txt-box pb-5">
              {isСheckerMode ? (
                <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
              ) : (
                <EditAreaDim
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

export default EditDimBox;
