import React, { useState } from "react";

import EditRubBody from "../Rubrics/EditRubBody";
import RubMenu from "./RubMenu";
import DimAddDetail from "../DimentionsPage/DimAddDetail";

const RubricatorShort = ({ editParam }) => {
  const [showBody, setShowBody] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const fieldFn = editParam.fieldFn;

  return (
    <div className={editParam.noScores ? "h-90 w-50" : "h-90"}>
      <div className="body-dim-line rub-title" id="RubricaT">
        <RubMenu
          fieldFn={fieldFn}
          editParam={editParam}
          setShowBody={setShowBody}
          showBody={showBody}
          small={editParam.noScores}
        />
        <DimAddDetail
          id="issueNameCh"
          title="simple mode"
          val={simpleMode}
          setVal={setSimpleMode}
        />

        <span className="d-flex">
          RUBRICATOR
          <span>
            {" (" + (editParam.item && editParam.item.rubricator.length) + ") "}
          </span>
        </span>
      </div>
      <div className="maxhrub-100">
        <div className={"dimBox rubh"}>
          <EditRubBody
            simpleMode={simpleMode}
            editParam={{
              ...editParam,
              showBody,
              setShowBody,
              noScores: editParam.noScores,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RubricatorShort;
