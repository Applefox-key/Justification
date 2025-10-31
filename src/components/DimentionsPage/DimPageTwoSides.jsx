import React, { useEffect, useState } from "react";
import DimPageOneSide from "./DimPageOneSide";
import { defaultDimSets } from "../../constants/dimDefault";

import { compose } from "../../utils/rates";
import ScalableInput from "../EditBtns/ScalableInput";
import DimLastField from "./DimLastField";
import CheckRespBtn from "../EditBtns/CheckRespBtn";
import MyPortal from "../UI/MyPortal/MyPortal";
import DimBtnsHot from "../Dimentions/DimBtnsHot";
import DmgSingleResponse from "./DmgSingleResponse";
import PromptRate from "./PromptRate";
import RateInformOne from "../Rate/RateInformOne";

const DimPageTwoSides = ({ editParam, response }) => {
  const [content, setContent] = useState({ left: response, right: "DMG" });

  const resp = response === "ResponseA" ? "a" : "b";
  const setContentVal = (side, newVal) => {
    const secondSide = side === "left" ? "right" : "left";
    let newValSecond = content[secondSide];
    if (newVal === content[secondSide]) newValSecond = content[side];
    setContent({ ...content, [side]: newVal, [secondSide]: newValSecond });
  };
  useEffect(() => {
    setContent({ left: response, right: "DMG" });
  }, [response]);

  const currField = defaultDimSets[editParam.item.setName].filter(
    (el) => el.a === editParam.fieldId || el.b === editParam.fieldId
  );
  const contentArr = {
    [`${response}`]: (
      <DimLastField fieldRate={response} fieldId={editParam.fieldId} item={editParam.item} fieldFn={editParam.fieldFn}>
        {/* <div className="me-4">ALT+X: with coma</div>
        <div className="me-4">ALT+Z: new row</div> */}
        <RateInformOne item={editParam.item} resp={resp} />
        {<CheckRespBtn item={editParam.item} fieldRate={response} />}
      </DimLastField>
    ),

    [`Rate${resp.toUpperCase()}`]: (
      <ScalableInput
        fieldName={`Rate${resp.toUpperCase()}`}
        fieldId={editParam.fieldId}
        fieldVal={editParam.item[`Rate${resp.toUpperCase()}`]}
        fieldFn={editParam.fieldFn}
        // item={editParam.item}
        onChange={(val) => {
          editParam.fieldFn.setNewVal(val);
        }}>
        <button onClick={() => compose(editParam.item, editParam.setItem, `Rate${resp.toUpperCase()}`, 1)}>
          {`Rate ${resp.toUpperCase()}`}
        </button>
      </ScalableInput>
    ),
    Prompt: <PromptRate editParam={editParam} content={content} rate={`Rate${resp.toUpperCase()}`} />,
    DMG: <DmgSingleResponse editParam={editParam} resp={resp} />,
  };

  return (
    <div className="two-sides-wrap">
      <MyPortal containerId="portal-got-resp">
        {!!currField && !!currField.length && (
          <DimBtnsHot
            field={currField[0]}
            pasteToText={editParam.pasteToText}
            action={editParam.action}
            set={editParam.item.setName}
          />
        )}
      </MyPortal>
      <DimPageOneSide
        contentArr={contentArr}
        content={content.left}
        otherC={content.right}
        setContent={(val) => setContentVal("left", val)}
      />
      <DimPageOneSide
        contentArr={contentArr}
        content={content.right}
        otherC={content.left}
        setContent={(val) => setContentVal("right", val)}
      />
      {/* <div className="one-side">
        1
      
      </div>
      <div className="one-side">2</div> */}
    </div>
  );
};

export default DimPageTwoSides;
