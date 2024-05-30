import React, { useState } from "react";
import EditBox from "./EditBox";
import { Button } from "react-bootstrap";
import StrArea from "./StrArea";
import { toLS } from "../utils/localStorage";

const Justification = ({ justification, setJustification }) => {
  const [edit, setEdit] = useState(null);
  function concatenateEnFields() {
    return justification
      .map((obj) => obj.en)
      .reduce((acc, val) => {
        if (val === "." || val === ",") {
          return acc + val;
        }
        return acc + " " + val;
      }, "")
      .trim();
  }
  const refresh = (txt) => {
    const newVal = [...justification];
    newVal[edit].en = txt;

    setJustification(newVal);
    setEdit(null);
  };
  const allJust = concatenateEnFields();
  return (
    <>
      {edit !== null && (
        <EditBox setEdit={setEdit} el={justification[edit]} savefn={refresh} />
      )}
      <div className="justif">
        <div className="textarea-box">
          <StrArea
            placeholder="...add to justification"
            actionFn={(handleTxt) =>
              setJustification([...justification, { en: handleTxt, ru: "" }])
            }
          />
          <Button onClick={() => setJustification([])}>clear</Button>
        </div>
        <div className="justif-body">
          {justification.map((el, i) => (
            <div className="justif-item" onClick={() => setEdit(i)}>
              {el.en}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setJustification(
                    justification.slice(0, i).concat(justification.slice(i + 1))
                  );
                }}>
                x
              </button>
            </div>
          ))}
        </div>
        {allJust && (
          <div className="justif-all">
            {allJust}
            <button onClick={() => setJustification([{ en: allJust, ru: "" }])}>
              join
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Justification;
