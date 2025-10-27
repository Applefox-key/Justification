import React from "react";

import ScalableInput from "../EditBtns/ScalableInput";

const DmgFieldEditPage = ({
  autoFocus,
  fieldName,
  placeholder,
  isActive,
  fieldVal,
  fieldFn,
  classN,
  fieldId,
  btnSide,
  small = null,
  scale = null,
  show = true,
}) => {
  return (
    <div className={"field-box" + (!show ? " field-close-" + scale || "" : "")}>
      <>
        {show ? (
          <ScalableInput
            fieldId={fieldId}
            fieldName={fieldName}
            fieldVal={fieldVal}
            fieldFn={fieldFn}
            btnSide={btnSide}
            small={small}
            // id={(small ? "" : "clone-") + fieldName}
            id={fieldName}
            autoFocus={autoFocus}
            className={"fieldDim " + (small ? "dimFieldSmall " : "") + classN}
            placeholder={placeholder}
            onKeyDown={fieldFn.onKeyDown}
            onChange={(val) => {
              fieldFn.setNewVal(val);
            }}
          />
        ) : (
          <div className="field-val-close"> {fieldVal}</div>
        )}

        {/* {!small && (
            <TextFocusBtns
              scale={scale}
              fieldName={fieldName}
              fieldVal={fieldVal}
              fieldFn={fieldFn}
              refBox={refBox}
              refC={ref}
            />
          )} */}
      </>
    </div>
  );
};

export default DmgFieldEditPage;
