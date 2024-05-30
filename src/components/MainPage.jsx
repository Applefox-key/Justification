import React, { useState } from "react";
import CurrentBtn from "./CurrentBtn";
import Justification from "./Justification";
import TxtBtns from "./TxtBtns";
import List from "./List";
import { getHistory } from "../utils/localStorage";
import FileLib from "./FIleLib";

const MainPage = () => {
  const [justparts, setJustparts] = useState([]);
  const [currBtn, setCurrBtn] = useState(null);
  const [justification, setJustification] = useState([]);
  const [curSection, setCurSection] = useState(null);
  const toJustif = (el) => {
    setJustification([...justification, el]);
  };
  return (
    <div className="main-page">
      <FileLib files={justparts} setJustparts={setJustparts} />

      <div className="page-body">
        <div className="up-part">
          <div className="page-part">
            <TxtBtns toJustif={toJustif} />
            <Justification
              justification={justification}
              setJustification={setJustification}
            />
            {/* {currBtn !== null && <List list={currBtn.hint} />} */}
            {curSection && !!curSection.hint && <List list={curSection.hint} />}
          </div>
          <div className="page-part">
            <div className="partsBtns">
              {!!justparts.length &&
                justparts.map((el, i) => (
                  <div
                    className={
                      currBtn && currBtn.name === el.name
                        ? "parts-btn activeBtn"
                        : "parts-btn"
                    }
                    onClick={() => {
                      setCurrBtn(el);
                    }}>
                    {el.name}
                  </div>
                ))}
              <div
                className={
                  currBtn && currBtn.name === "history"
                    ? "parts-btn activeBtn"
                    : "parts-btn"
                }
                onClick={() => {
                  setCurrBtn(getHistory());
                }}>
                History
              </div>
            </div>
            {currBtn !== null && (
              <CurrentBtn
                currentBtn={currBtn}
                toJustif={toJustif}
                setCurrBtn={setCurrBtn}
                curSection={curSection}
                setCurSection={setCurSection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
