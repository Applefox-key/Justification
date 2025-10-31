import React, { useMemo, useState } from "react";

import DmgOneTab from "./DmgOneTab";
import RespDmgFieldEdit from "./RespDmgFieldEdit";
import DimAddDetail from "./DimAddDetail";
import { defaultDimSets } from "../../constants/dimDefault";

const DmgShortSBS = ({ editParam, scoresSBS, showBody }) => {
  console.log("sbs", showBody);
  const [focus, setFocus] = useState(""); //focus.slice(0, -1) !== field[resp].slice(0, -1)
  const dimArr = defaultDimSets[editParam.item.setName];
  const dimarrFilter = useMemo(() => (focus ? dimArr.filter((el) => focus === el.short) : dimArr), [focus, dimArr]);
  return (
    <>
      {dimarrFilter.map((field, i) => (
        <>
          <div className="rrr">
            {["a", "", "b"].map((resp) =>
              resp ? (
                <RespDmgFieldEdit
                  key={i + resp}
                  scale="left"
                  show={!!editParam.item[field[resp]]}
                  fieldName={field[resp]}
                  placeholder={field[resp]}
                  fieldId={editParam.fieldId}
                  fieldVal={editParam.item[field[resp]]}
                  estim={editParam.item.Evals[field[resp]]}
                  fieldFn={editParam.fieldFn}
                  showBody={showBody}
                  clBox={!focus ? "" : focus !== field.short ? "hideBox" : "showOneBox"}
                />
              ) : (
                <div className="nav-dmg">
                  {(focus ? dimArr : [field]).map((el) => (
                    <button
                      className={focus === el.short ? "activeTab" : ""}
                      onClick={() => setFocus(focus === el.short ? "" : el.short)}>
                      {el.short}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </>
      ))}
    </>
  );
};

export default DmgShortSBS;
// focus ? (<DmgOneTab editParam={{ ...editParam, field }} showBody={showBody} noMenu />) :
// <DimAddDetail
//                     id={"foc" + el.short}
//                     title=""
//                     val={!!focus}
//                     setVal={(val) => setFocus(val ? el.short : "")}
//                   />
