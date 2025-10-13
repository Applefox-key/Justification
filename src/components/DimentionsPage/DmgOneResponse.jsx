import React, { useEffect, useState } from "react";
import RespDmgFieldEdit from "./RespDmgFieldEdit";
import DimBtnsHot from "../Dimentions/DimBtnsHot";
import MyPortal from "../UI/MyPortal/MyPortal";
import DimAddDetail from "./DimAddDetail";
import DimLastField from "./DimLastField";

const DmgOneResponse = ({ editParam, dimArr, resp }) => {
  const { item, fieldFn, fieldId } = editParam;
  const currField = dimArr.filter((el) => el.a === fieldId || el.b === fieldId);
  const [showRate, setShowRate] = useState(true);
  // const [lastF, setLastF] = useState({ name: "", poz: 0 });
  const fieldRate = resp === "a" ? "RateA" : "RateB";

  return (
    <div className="one-resp-wrap">
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
      <MyPortal containerId="portal-on-tabs">
        <DimAddDetail
          id="showRfSwitch"
          title="Show rate field"
          val={showRate}
          setVal={setShowRate}
        />
      </MyPortal>
      {showRate && (
        <MyPortal containerId="portal-dmg-page-colon">
          <div className="additional-colon">
            <DimLastField
              fieldRate={fieldRate}
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
          isActive={fieldId === field[resp]}
          fieldVal={item[field[resp]]}
          estim={item.Evals[field[resp]]}
          fieldFn={fieldFn}
        />
      ))}
    </div>
  );
};

export default DmgOneResponse;
