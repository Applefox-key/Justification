import React, { useEffect, useState } from "react";

import RateDmgScale from "../Dimentions/RateDmgScale";

import ScalableInput from "../EditBtns/ScalableInput";
import DimAddDetail from "./DimAddDetail";

const RespDmgFieldEdit = ({
  autoFocus,
  fieldName,
  fieldId,
  fieldVal,
  estim = null,
  small = null,
  fieldFn,
  classN,
  placeholder,
  scale = null,
  show = true,
  clBox = "",
  focus = null,
  setFocus,
  showBody,
  children,
}) => {
  const [sh, setSh] = useState(show);

  const switchSh = (e) => {
    e.stopPropagation();
    setSh(!sh);
  };
  useEffect(() => {
    if (typeof showBody === "boolean") {
      setSh(showBody);
    }
  }, [showBody]);
  return (
    <div
      onClick={(e) => {
        if (!sh) switchSh(e);
      }}
      className={`one-resp-box ${sh ? "" : "h-min"} ${clBox} `}>
      <>
        <div className="header-one-dim">
          <span onClick={switchSh} className={estim === 0 ? "d-flex empty-estim" : "d-flex"}>
            {fieldName}
          </span>

          {scale === "left" && (
            <div className="d-flex">
              {children}
              {setFocus && (
                <DimAddDetail
                  id={"foc" + fieldName}
                  title=""
                  val={!!focus}
                  setVal={(val) => setFocus(val ? fieldName : "")}
                />
              )}
              <RateDmgScale horiz={true} val={estim} setVal={(v) => fieldFn.setNewEstim(v, fieldName)} />
            </div>
          )}
        </div>
        {sh ? (
          <ScalableInput
            fieldId={fieldId}
            fieldName={fieldName}
            fieldVal={fieldVal}
            fieldFn={fieldFn}
            small={small}
            id={fieldName}
            autoFocus={autoFocus}
            onChange={(val) => fieldFn.setNewVal(val)}
            className={"fieldDim " + (small ? "dimFieldSmall " : "") + (classN || "")}
            placeholder={placeholder}
            onKeyDown={fieldFn.onKeyDown}
          />
        ) : (
          <div className="field-val-close"> {fieldVal}</div>
        )}
        {scale === "right" && (
          <RateDmgScale horiz={!show} val={estim} setVal={(v) => fieldFn.setNewEstim(v, fieldName)} />
        )}
      </>
    </div>
  );
};

export default RespDmgFieldEdit;
