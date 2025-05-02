import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import ThemeBox from "../ImgBack/ThemeBox";
import { defaultRubJust } from "../../constants/textParts";
import BtnFontSize from "../EditBtns/BtnFontSize";
import EditAreaRub from "./EditAreaRub";
import { RiDragMoveFill } from "react-icons/ri";
import TextChecker from "../UI/TextChecker";
import { BsCardText } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { setRespNames } from "../../utils/localStorage";

const RubBox = ({ setEdit, savefn, el }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isСheckerMode, setIsCheckerMode] = useState(false);

  const [item, setItem] = useState(
    el ? { ...defaultRubJust, ...JSON.parse(el) } : defaultRubJust
  );
  const [action, setAction] = useState("@R");

  useEffect(() => {
    const newVal = localStorage.getItem("lastAction") || "@R";
    if (newVal !== action) setAction(newVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="module-wrap-edit">
      <div className="editbox-wrap-rub">
        <Draggable disabled={isFullScreen} handle=".handle">
          <div
            className="rubbox"
            onClick={(e) => e.stopPropagation()}
            id="rubbox">
            <div className="handle">
              <div className="d-flex align-items-center">
                <button
                  className="square-btn hotBtnGr rel-left"
                  onClick={() => setRespNames(action, setAction)}>
                  {action}
                </button>
                <ThemeBox />
                <BtnFontSize />
              </div>
              <h5>RUBRICS</h5>

              <div>
                <Button
                  className="btn-back"
                  onClick={() => setIsCheckerMode(!isСheckerMode)}>
                  {isСheckerMode ? (
                    <BsCardText />
                  ) : (
                    <IoCheckmarkDoneCircleOutline />
                  )}
                </Button>
                <BoxSizeBtn
                  id="rubbox"
                  callback={setIsFullScreen}
                  isFullScreen={isFullScreen}
                />
                <Button
                  className="btn-backXl"
                  onClick={() => {
                    if (window.confirm("Quit without changies?")) setEdit(null);
                  }}>
                  <IoIosClose />
                </Button>
              </div>
            </div>

            {isСheckerMode ? (
              <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
            ) : (
              <div className="txt-box-rub pb-5">
                <div className="handle hbottom-dim">
                  <RiDragMoveFill />
                </div>
                <EditAreaRub
                  item={item}
                  setItem={setItem}
                  actionFn={savefn}
                  action={action}
                />
              </div>
            )}
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default RubBox;
