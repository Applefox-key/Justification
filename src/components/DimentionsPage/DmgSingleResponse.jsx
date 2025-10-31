import React, { useState } from "react";

import MyPortal from "../UI/MyPortal/MyPortal";

import RespDmgFieldEdit from "./RespDmgFieldEdit";
import { VscTriangleRight } from "react-icons/vsc";
import { defaultDimSets } from "../../constants/dimDefault";
import RateInformLink from "../Rate/RateInformLink";

const DmgSingleResponse = ({ editParam, resp }) => {
  const [showBody, setShowBody] = useState(true);
  const [focus, setFocus] = useState("");
  console.log(focus);
  const dimArr = defaultDimSets[editParam.item.setName];
  return (
    <>
      {dimArr.map((field, i) => (
        <RespDmgFieldEdit
          key={i}
          scale="left"
          showBody={showBody}
          clBox={!focus ? "" : focus.slice(0, -1) !== field[resp].slice(0, -1) ? "hideBox" : "showOneBox"}
          focus={focus === field[resp]}
          setFocus={setFocus}
          fieldName={field[resp]}
          placeholder={field[resp]}
          fieldId={editParam.fieldId}
          fieldVal={editParam.item[field[resp]]}
          estim={editParam.item.Evals[field[resp]]}
          fieldFn={editParam.fieldFn}>
          {focus === field[resp] && (
            <RateInformLink item={editParam.item} resp={resp} callback={(field) => setFocus(field)} current={focus} />
          )}
        </RespDmgFieldEdit>
      ))}

      <MyPortal containerId="portal-dmg-arrow">
        <VscTriangleRight onClick={() => setShowBody(!showBody)} className={!showBody ? " " : "arr-down"} />
      </MyPortal>
    </>
  );
};

export default DmgSingleResponse;
