import React, { useState } from "react";
import EditBox from "./EditBox";
import { Button } from "react-bootstrap";
import JustifBody from "./JustifBody";
import { concatenateEnFields, copyToClipboard } from "../utils/utilStr";
import TxtBtnsOverlay from "./TxtBtnsOverlay";
import { RxCopy } from "react-icons/rx";
import { MdOutlineContentPaste } from "react-icons/md";

const Justification = ({ justification, setJustification }) => {
  const [edit, setEdit] = useState(null);
  const toJustif = (el) => {
    setJustification([...justification, el]);
  };
  const refresh = (txt) => {
    if (edit === "all") {
      setJustification([{ en: txt }]);
      setEdit(null);
      return;
    }
    const newVal = [...justification];
    newVal[edit].en = txt;
    setJustification(newVal);
    setEdit(null);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    const newVal = [...justification, { en: text }];
    // setPreviousTxt(handleTxt);
    setJustification(newVal);
  };
  const allJust = concatenateEnFields(justification);
  return (
    <>
      {edit !== null && (
        <EditBox
          setEdit={setEdit}
          el={edit === "all" ? { en: allJust } : justification[edit]}
          savefn={refresh}
        />
      )}{" "}
      <div className="just-menu ">
        <div className="btnsJust justif-all-btn">
          <Button onClick={() => setEdit("all")}>edit</Button>{" "}
          <Button onClick={pasteFromClipboard}>
            <MdOutlineContentPaste />
            paste
          </Button>
          {allJust && (
            <>
              {" "}
              <Button
                className="btnToHis"
                onClick={(e) => copyToClipboard(allJust)}>
                <RxCopy />
                copy
              </Button>{" "}
              <Button
                onClick={() => setJustification([{ en: allJust, ru: "" }])}>
                join
              </Button>{" "}
              <Button onClick={() => setJustification([])}>clear</Button>
            </>
          )}
        </div>
      </div>
      <div className="justif glas">
        <h1>JUSTIFICATION</h1>
        <JustifBody
          justification={justification}
          setJustification={setJustification}
          setEdit={setEdit}
        />{" "}
      </div>{" "}
      {/* <div className="textarea-box mt-3">
        <StrArea
          placeholder="...add to justification"
          actionFn={(handleTxt) =>
            setJustification([...justification, { en: handleTxt, ru: "" }])
          }
        />
      </div> */}
      {/* <TxtBtns toJustif={toJustif} /> */}
      <TxtBtnsOverlay toJustif={toJustif} />
      {allJust && <div className="justif-all">{allJust}</div>}
    </>
  );
};

export default Justification;
