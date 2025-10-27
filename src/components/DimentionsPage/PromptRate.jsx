import React, { useState } from "react";
import ScalableInput from "../EditBtns/ScalableInput";
import MyPortal from "../UI/MyPortal/MyPortal";
import { VscTriangleRight } from "react-icons/vsc";

const PromptRate = ({ editParam, content, rate }) => {
  const [showRate, setShowRate] = useState(false);
  const isRate = content.left !== rate && content.right !== rate;
  return (
    <>
      {isRate && (
        <MyPortal containerId="portal-dmg-prompt">
          <VscTriangleRight onClick={() => setShowRate(!showRate)} className={!showRate ? " " : "arr-down"} />
        </MyPortal>
      )}
      <div className={`div-prompt ${showRate && isRate ? "short-prompt" : ""}`}>{editParam.item.Prompt}</div>
      {showRate && isRate && (
        <ScalableInput
          className="short-rate"
          fieldName={rate}
          fieldId={editParam.fieldId}
          fieldVal={editParam.item[rate]}
          fieldFn={editParam.fieldFn}
          item={editParam.item}
          onChange={(val) => {
            editParam.fieldFn.setNewVal(val);
          }}
        />
      )}
    </>
  );
};

export default PromptRate;
