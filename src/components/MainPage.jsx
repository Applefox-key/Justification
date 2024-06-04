import React, { useEffect, useState } from "react";
import FileSheets from "./FileSheets";
import Justification from "./Justification";

import FileChoose from "./FileChoose";
import FilesList from "./FilesList";
import { getHistory } from "../utils/localStorage";
import StrArea from "./StrArea";

const MainPage = () => {
  const [justparts, setJustparts] = useState([]);
  const [currBtn, setCurrBtn] = useState(null);
  const [justification, setJustification] = useState([]);
  const [curSection, setCurSection] = useState(null);
  const toJustif = (el) => {
    setJustification([...justification, el]);
  };
  const defaultState = (data = null) => {
    if (data === null) {
      setJustparts([]);
      setCurrBtn(getHistory());
    } else {
      setJustparts([...justparts, data]);
    }
  };

  useEffect(() => {
    if (currBtn === null) return;
    setCurSection(currBtn.items.length === 1 ? currBtn.items[0] : null);
  }, [currBtn]);
  return (
    <div className="main-page">
      <div className="menu d-flex pb-1 pt-2 pe-4 ps-2 w-100 justify-content-between">
        <FileChoose files={justparts} defaultState={defaultState} />
        <FilesList
          justparts={justparts}
          currBtn={currBtn}
          setCurrBtn={setCurrBtn}
          defaultState={defaultState}
        />
      </div>
      <div className="textarea-box ps-3 pe-3">
        <StrArea
          placeholder="...add to justification"
          actionFn={(handleTxt) =>
            setJustification([...justification, { en: handleTxt, ru: "" }])
          }
        />
      </div>
      <div className="page-body">
        <div className="up-part">
          <div className="page-part">
            <Justification
              justification={justification}
              setJustification={setJustification}
            />{" "}
          </div>
          <div className="page-part right">
            {currBtn !== null && (
              <FileSheets
                currentBtn={currBtn}
                toJustif={toJustif}
                setCurrBtn={setCurrBtn}
                curSection={curSection}
                setCurSection={setCurSection}
              />
            )}
          </div>
        </div>
        <StrArea placeholder="...your notes" type="voice" />
      </div>
    </div>
  );
};

export default MainPage;
