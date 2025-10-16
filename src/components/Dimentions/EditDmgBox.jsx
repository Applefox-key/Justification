import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";

import { BsCardText } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import TextChecker from "../UI/TextChecker";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ThemeBox from "../ImgBack/ThemeBox";
import { constructDefItem, getNewOrParseDmg } from "../../utils/dimentions";

import EditAreaDmg from "./EditAreaDmg";
import BtnFontSize from "../EditBtns/BtnFontSize";
import DimSetsList from "./DimSetsList";
import { RiDragMoveFill } from "react-icons/ri";
import { setRespNames } from "../../utils/localStorage";
// el, setEdit, savefn

const EditDmgBox = ({ setEdit, savefn, el }) => {
  const [isСheckerMode, setIsCheckerMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [action, setAction] = useState("@R");

  const [item, setItem] = useState(null);

  useEffect(() => {
    const newVal = localStorage.getItem("lastAction") || "@R";
    if (newVal !== action) setAction(newVal);
    setItem(getNewOrParseDmg(el));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeSet = (ns) => {
    if (window.confirm("Change dimentions set? task will be cleared?"))
      setItem(constructDefItem(ns));
  };

  return (
    <div className="module-wrap-edit">
      {item !== null && (
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
                      setRespNames(action, setAction);
                    }}>
                    {action}
                  </button>
                  <DimSetsList curSet={item.setName} setCurSet={changeSet} />
                  <ThemeBox />
                  <BtnFontSize />
                </div>{" "}
                <h5>EDIT COMMENT DIMENTIONS SETS</h5>
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
                  <BoxSizeBtn
                    id="editbox"
                    callback={setIsFullScreen}
                    isFullScreen={isFullScreen}
                  />
                  <Button
                    className="btn-backXl"
                    onClick={() => {
                      if (window.confirm("Quit without changies?"))
                        setEdit(null);
                    }}>
                    <IoIosClose />
                  </Button>
                </div>
              </div>
              <div className="txt-box pb-5">
                {" "}
                <div className="handle hbottom-dim">
                  <RiDragMoveFill />
                </div>
                {isСheckerMode ? (
                  <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
                ) : (
                  <EditAreaDmg
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
      )}
    </div>
  );
};

export default EditDmgBox;
