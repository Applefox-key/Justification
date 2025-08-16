import React, { useEffect, useState } from "react";
import TextChecker from "../UI/TextChecker";
import { Button } from "react-bootstrap";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { BsCardText } from "react-icons/bs";
import DimSetsList from "../Dimentions/DimSetsList";
import BtnFontSize from "../EditBtns/BtnFontSize";
import { constructDefItem, getNewOrParseDmg } from "../../constants/textParts";
import { setRespNames } from "../../utils/localStorage";
import DmgPageBody from "./DmgPageBody";
import MyPortal from "../UI/MyPortal/MyPortal";

const DmgPage = () => {
  const [isСheckerMode, setIsCheckerMode] = useState(false);
  const [action, setAction] = useState("@R");

  const [item, setItem] = useState(getNewOrParseDmg(null));

  const savefn = () => {};
  useEffect(() => {
    const newVal = localStorage.getItem("lastAction") || "@R";
    if (newVal !== action) setAction(newVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeSet = (ns) => {
    if (window.confirm("Change dimentions set? task will be cleared?"))
      setItem(constructDefItem(ns));
  };

  return (
    <div className={"bg-main pagedimwrap"} id="mainp">
      <div className="editWin " onClick={(e) => e.stopPropagation()}>
        <div className="bigmenu">
          <MyPortal containerId="navidPortal">
            <div className="small-menu-nav">
              <button
                // className="square-btn hotBtnGr rel-left"
                className="btn-back m-0 round-btn"
                onClick={() => {
                  setRespNames(action, setAction);
                }}>
                {action}
              </button>
              <DimSetsList curSet={item.setName} setCurSet={changeSet} />
              <BtnFontSize />
              <Button
                className="btn-back"
                onClick={() => setIsCheckerMode(!isСheckerMode)}>
                {isСheckerMode ? (
                  <BsCardText />
                ) : (
                  <IoCheckmarkDoneCircleOutline />
                )}
              </Button>
            </div>
          </MyPortal>
        </div>

        <div className="txt-box pb-5">
          {isСheckerMode ? (
            <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
          ) : (
            <DmgPageBody
              item={item}
              setItem={setItem}
              actionFn={savefn}
              action={action}
              setIsCheckerMode={setIsCheckerMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DmgPage;
