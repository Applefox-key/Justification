import React, { useEffect, useState } from "react";
import Sheets from "./MenuSheets/Sheets";
import Justification from "./Comment/Justification";
import FilesList from "./MenuSheets/FilesList";
import { firstBack, getHistory } from "../utils/localStorage";
import Responses from "./Rate/Responses";
import FileChooseMenu from "./UI/FileChooseMenu";
import ContentSide from "./MenuSheets/ContentSide";
import ThemeBox from "./ImgBack/ThemeBox";
import Popup from "./UI/Popup";

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
  const compliteCrit = (isLowCase = false) => {
    if (currBtn === null) return [];
    return currBtn.items.map((el) =>
      isLowCase ? el.name.toLowerCase() : el.name
    );
  };
  useEffect(() => {
    if (currBtn === null) return;
    setCurSection(currBtn.items.length === 1 ? currBtn.items[0] : null);
  }, [currBtn]);

  useEffect(() => {
    firstBack();
  }, []);

  return (
    <div className={"bg-main"} id="mainp">
      {/* <div id="portal-root" /> */}
      <Responses compliteCrit={compliteCrit} toJustif={toJustif} /> <Popup />
      <div className="menu d-flex pb-1 pt-2 pe-4 ps-2 w-100 justify-content-between">
        <ThemeBox />{" "}
        <div className="d-flex">
          <FilesList
            justparts={justparts}
            currBtn={currBtn}
            setCurrBtn={setCurrBtn}
          />
          <FileChooseMenu defaultState={defaultState} />
        </div>
      </div>
      <div className="page-body">
        {currBtn !== null && (
          <Sheets
            currentBtn={currBtn}
            curSection={curSection}
            setCurSection={setCurSection}
            setCurrBtn={setCurrBtn}
          />
        )}
        <div className="up-part">
          <div className={currBtn ? "page-part w-50" : "page-part"}>
            <Justification
              justification={justification}
              setJustification={setJustification}
              compliteCrit={compliteCrit}
            />
          </div>

          {currBtn !== null && (
            <ContentSide
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
  );
};

export default MainPage;
