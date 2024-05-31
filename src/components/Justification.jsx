import React, { useState } from "react";
import EditBox from "./EditBox";
import { Button } from "react-bootstrap";
import StrArea from "./StrArea";
import JustifBody from "./JustifBody";

const Justification = ({ justification, setJustification }) => {
  const [edit, setEdit] = useState(null);

  const refresh = (txt) => {
    const newVal = [...justification];
    newVal[edit].en = txt;

    setJustification(newVal);
    setEdit(null);
  };

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
        <JustifBody
          justification={justification}
          setJustification={setJustification}
          setEdit={setEdit}
        />
      </div>
    </>
  );
};

export default Justification;
