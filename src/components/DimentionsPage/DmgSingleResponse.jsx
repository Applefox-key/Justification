import React, { useEffect, useState } from "react";

import DimBtnsHot from "../Dimentions/DimBtnsHot";
import MyPortal from "../UI/MyPortal/MyPortal";
import DmgShortSBS from "./DmgShortSBS";

import DimAddDetail from "./DimAddDetail";
import DimLastField from "./DimLastField";
import RespDmgFieldEdit from "./RespDmgFieldEdit";
import { VscTriangleRight } from "react-icons/vsc";

const DmgSingleResponse = ({ editParam, dimArr, resp }) => {
  const [showBody, setShowBody] = useState(true);
  return (
    <>
      {dimArr.map((field, i) => (
        <RespDmgFieldEdit
          key={i}
          scale="left"
          //   clBox={showRate ? "w-100" : ""}
          showBody={showBody}
          fieldName={field[resp]}
          placeholder={field[resp]}
          fieldId={editParam.fieldId}
          fieldVal={editParam.item[field[resp]]}
          estim={editParam.item.Evals[field[resp]]}
          fieldFn={editParam.fieldFn}
        />
      ))}

      <MyPortal containerId="portal-dmg-arrow">
        <VscTriangleRight onClick={() => setShowBody(!showBody)} className={!showBody ? " " : "arr-down"} />
        {/* <button
          id={"show-body-" + id}
          onClick={() => setVal(!val)}
          className={!val ? "show-body-dim w-100" : "show-body-dim btn-on w-100"}></button> */}
        {/* {!hideResp && <DimAddDetail id="showRateSwitch" title="Show responses" val={isRate} setVal={setIsRate} isBtn />} */}
        {/* <DimAddDetail title="Dimentions scores" val={showBody} setVal={setShowBody} isBtn /> */}
      </MyPortal>
    </>
  );
};

export default DmgSingleResponse;
