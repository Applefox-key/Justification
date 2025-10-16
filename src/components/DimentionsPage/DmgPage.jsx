import React, { useEffect, useState } from "react";
import TextChecker from "../UI/TextChecker";
import { Button } from "react-bootstrap";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { BsCardText } from "react-icons/bs";
import DimSetsList from "../Dimentions/DimSetsList";
import BtnFontSize from "../EditBtns/BtnFontSize";
// import { constructDefItem, getNewOrParseDmg } from "../../constants/dimentions";
import DmgPageBody from "./DmgPageBody";
import MyPortal from "../UI/MyPortal/MyPortal";
import { sAlert } from "../../utils/alert";
import ResponseFormatList from "../Dimentions/ResponseFormatList";
import { constructDefItem, getNewOrParseDmg } from "../../utils/dimentions";

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
  const changeSet = async (ns) => {
    const result = await sAlert({
      title: "Change dimentions set? ",
      text: "task will be cleared",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) setItem(constructDefItem(ns));
  };
  console.log(item);

  return (
    <div className={"bg-main pagedimwrap"} id="mainp">
      <div className="editWin " onClick={(e) => e.stopPropagation()}>
        <div className="bigmenu">
          <MyPortal containerId="navidPortal">
            <div className="small-menu-nav">
              <ResponseFormatList action={action} setAction={setAction} />
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

        <div className="txt-box">
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
