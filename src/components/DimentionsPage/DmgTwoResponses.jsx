import React, { useEffect, useState } from "react";

import DimBtnsHot from "../Dimentions/DimBtnsHot";
import MyPortal from "../UI/MyPortal/MyPortal";
import DmgShortSBS from "./DmgShortSBS";

import DimAddDetail from "./DimAddDetail";
import DimLastField from "./DimLastField";
import { VscTriangleRight } from "react-icons/vsc";
import RateInformOne from "../Rate/RateInformOne";
import { defaultDimSets } from "../../constants/dimDefault";

const DmgTwoResponses = ({ editParam, hideResp, dmg }) => {
  const dimArr = defaultDimSets[editParam.item.setName];
  const { item, fieldId } = editParam;
  const currField = dimArr.filter((el) => el.a === fieldId || el.b === fieldId);
  const [scoresSBS, setScoresSBS] = useState(false);
  const [showBody, setShowBody] = useState(true);
  const [isRate, setIsRate] = useState(false);

  useEffect(() => {
    const elem = document.getElementById("page-dim");
    if (!elem) return;
    if (isRate) elem.classList.add("half-hight");
    else elem.classList.remove("half-hight");
  }, [isRate]);
  useEffect(() => {
    return () => {
      const elem = document.getElementById("page-dim");
      if (elem) elem.classList.remove("half-hight");
    };
  }, []);
  return (
    <>
      {isRate && (
        <MyPortal containerId="portal-dmg-page-row">
          <div className="two-resp-wrap-plus half-hight">
            <div className="rrr w-100">
              {["ResponseA", "ResponseB"].map((fieldRate) => (
                <div className="one-resp-box">
                  <DimLastField
                    fieldRate={fieldRate}
                    fieldId={editParam.fieldId}
                    item={editParam.item}
                    fieldFn={editParam.fieldFn}
                    classF="additional-row"
                  />
                </div>
              ))}
            </div>
          </div>
        </MyPortal>
      )}
      {!scoresSBS && (
        <MyPortal containerId="portal-got-resp">
          {!!currField && !!currField.length && (
            <DimBtnsHot
              field={currField[0]}
              pasteToText={editParam.pasteToText}
              action={editParam.action}
              set={item.setName}
            />
          )}
        </MyPortal>
      )}
      {/* <MyPortal containerId="portal-dmg-arrow"> */}
      <MyPortal containerId="portal-sub-menu-left">
        {!hideResp && <DimAddDetail id="showRateSwitch" title="Show responses" val={isRate} setVal={setIsRate} isBtn />}
        {!dmg && <DimAddDetail title="Dimentions scores" val={showBody} setVal={setShowBody} isBtn />}

        <RateInformOne item={editParam.item} />
      </MyPortal>
      {dmg && (
        <MyPortal containerId="portal-dmg-arrow">
          <VscTriangleRight onClick={() => setShowBody(!showBody)} className={!showBody ? " " : "arr-down"} />
        </MyPortal>
      )}
      <div className="two-resp-wrap">
        <DmgShortSBS editParam={editParam} showBody={showBody} scoresSBS={scoresSBS} />
      </div>
    </>
  );
};

export default DmgTwoResponses;
