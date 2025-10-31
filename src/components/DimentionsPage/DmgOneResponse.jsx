import React, { useState } from "react";
import RespDmgFieldEdit from "./RespDmgFieldEdit";
import DimBtnsHot from "../Dimentions/DimBtnsHot";
import MyPortal from "../UI/MyPortal/MyPortal";
import DimAddDetail from "./DimAddDetail";
import DimLastField from "./DimLastField";
import { Form } from "react-bootstrap";
import { defaultDimSets } from "../../constants/dimDefault";
//not in use
const DmgOneResponse = ({ editParam, resp }) => {
  const { item, fieldFn, fieldId } = editParam;
  const dimArr = defaultDimSets[editParam.item.setName];
  const currField = dimArr.filter((el) => el.a === fieldId || el.b === fieldId);
  const [showRate, setShowRate] = useState("Response");

  const fieldResp = showRate + resp.toUpperCase();
  const switchShowRate = (val = "") => {
    let nv = val === "" ? (showRate === null ? "Response" : null) : val;
    setShowRate(nv);
  };
  return (
    <div className="one-resp-wrap">
      {/* <MyPortal containerId="portal-got-resp"> */}
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
      {/* <MyPortal containerId="portal-on-tabs"> */}
      <MyPortal containerId="portal-sub-menu-left">
        <DimAddDetail id="showRfSwitch" title="Show Response" val={showRate} setVal={() => switchShowRate()} isBtn />
        {showRate && (
          <div className="d-flex justify-content-between mt-2">
            {["Response", "Rate"].map((el) => (
              <Form.Check
                type={"radio"}
                label={el}
                id={"opt-" + el}
                name={`switchO`}
                checked={showRate === el}
                onChange={() => switchShowRate(el)}
              />
            ))}
          </div>
        )}
      </MyPortal>
      {showRate && (
        <MyPortal containerId="portal-dmg-page-colon">
          <div className="additional-colon">
            <DimLastField
              fieldRate={fieldResp}
              fieldId={editParam.fieldId}
              item={editParam.item}
              fieldFn={editParam.fieldFn}
            />
          </div>
        </MyPortal>
      )}
      {dimArr.map((field, i) => (
        <RespDmgFieldEdit
          key={i}
          scale="left"
          clBox={showRate ? "w-100" : ""}
          show={true}
          fieldName={field[resp]}
          placeholder={field[resp]}
          fieldId={fieldId}
          fieldVal={item[field[resp]]}
          estim={item.Evals[field[resp]]}
          fieldFn={fieldFn}
        />
      ))}
    </div>
  );
};

export default DmgOneResponse;
