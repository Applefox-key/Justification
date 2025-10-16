import React, { useEffect, useState } from "react";

import DimBtnsHot from "../Dimentions/DimBtnsHot";
import MyPortal from "../UI/MyPortal/MyPortal";
import DmgShortSBS from "./DmgShortSBS";

import DimAddDetail from "./DimAddDetail";
import DimLastField from "./DimLastField";

const DmgTwoResponses = ({ editParam, dimArr, hideResp }) => {
  const { item, fieldId } = editParam;
  const currField = dimArr.filter((el) => el.a === fieldId || el.b === fieldId);
  const [scoresSBS, setScoresSBS] = useState(false);
  const [showBody, setShowBody] = useState(false);
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
      <MyPortal containerId="portal-on-tabs">
        <DimAddDetail
          id="showRespSwitch"
          title="scores sbs"
          val={scoresSBS}
          setVal={setScoresSBS}
        />
        {!hideResp && (
          <DimAddDetail
            id="showRateSwitch"
            title="Show responses"
            val={isRate}
            setVal={setIsRate}
            isBtn
          />
        )}
        <DimAddDetail
          title="Dimentions scores"
          val={showBody}
          setVal={setShowBody}
          isBtn
        />
      </MyPortal>
      <div className="two-resp-wrap">
        {/* {short ? ( */}
        <DmgShortSBS
          editParam={editParam}
          dimArr={dimArr}
          showBody={showBody}
          scoresSBS={scoresSBS}
        />
        {/* ) : (
          <>
            {dimArr.map((field, i) => (
              <>
                <div className="rrr">
                  {["a", "b"].map((resp) => (
                    <RespDmgFieldEdit
                      key={i + resp}
                      scale="left"
                      show={!!item[field[resp]]}
                      fieldName={field[resp]}
                      placeholder={field[resp]}
                      isActive={fieldId === field[resp]}
                      fieldVal={item[field[resp]]}
                      estim={item.Evals[field[resp]]}
                      fieldFn={fieldFn}
                    />
                  ))}
                </div>
              </>
            ))}
          </>
        )} */}
      </div>
    </>
  );
};

export default DmgTwoResponses;
