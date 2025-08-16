import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { defaultRubJust } from "../../constants/textParts";
import BtnFontSize from "../EditBtns/BtnFontSize";

import TextChecker from "../UI/TextChecker";
import { BsCardText } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { setRespNames } from "../../utils/localStorage";
import RubricPageBody from "./RubricPageBody";
import MyPortal from "../UI/MyPortal/MyPortal";

const RubricPage = ({ setEdit, savefn, el }) => {
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
    <div className={"bg-main rubpage"} id="mainp">
      <div className="editWin" onClick={(e) => e.stopPropagation()}>
        {/* <div className="bigmenu">
        
        </div> */}
        <MyPortal containerId="navidPortal">
          <div className="small-menu-nav">
            <button
              className="btn-back m-0 round-btn"
              onClick={() => setRespNames(action, setAction)}>
              {action}
            </button>

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
        {isСheckerMode ? (
          <TextChecker close={() => setIsCheckerMode(!isСheckerMode)} />
        ) : (
          <div className="txt-box-rub pb-5 ">
            <RubricPageBody
              item={item}
              setItem={setItem}
              actionFn={savefn}
              action={action}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RubricPage;
