import React from "react";

import DmgOneTab from "./DmgOneTab";
import RespDmgFieldEdit from "./RespDmgFieldEdit";

const DmgShortSBS = ({ editParam, dimArr, scoresSBS, showBody }) => {
  console.log("sbs", showBody);

  return (
    <>
      {dimArr.map((field, i) =>
        scoresSBS ? (
          <DmgOneTab
            editParam={{ ...editParam, field }}
            small
            showBody={showBody}
          />
        ) : (
          <>
            <div className="rrr">
              {["a", "b"].map((resp) => (
                <RespDmgFieldEdit
                  key={i + resp}
                  scale="left"
                  show={!!editParam.item[field[resp]]}
                  fieldName={field[resp]}
                  placeholder={field[resp]}
                  isActive={editParam.fieldId === field[resp]}
                  fieldVal={editParam.item[field[resp]]}
                  estim={editParam.item.Evals[field[resp]]}
                  fieldFn={editParam.fieldFn}
                  showBody={showBody}
                />
              ))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default DmgShortSBS;
