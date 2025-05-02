import React, { useState } from "react";
import EditBox from "../EditBtns/EditBox";
import { Button } from "react-bootstrap";
import JustifBody from "./JustifBody";
import {
  cleanAndCapitalize,
  concatenateEnFields,
  copyToClipboard,
} from "../../utils/utilStr";
import TxtBtnsOverlay from "../TextParts/TxtBtnsOverlay";
import { RxCopy } from "react-icons/rx";
import { MdOutlineContentPaste } from "react-icons/md";
import { GrClearOption, GrConnect } from "react-icons/gr";
import { IoChatbubblesOutline } from "react-icons/io5";
import VoiceOverlay from "../Voice/VoiceOverlay";
import RubBox from "../Rubrics/RubBox";
import EditDmgBox from "../Dimentions/EditDmgBox";

const Justification = ({ justification, setJustification, compliteCrit }) => {
  const [edit, setEdit] = useState(null);
  const [showB, setShowB] = useState(false);
  const toJustif = (el) => {
    setJustification([...justification, el]);
  };
  const refresh = (txt) => {
    if (txt) {
      if (edit === "all") {
        setJustification([{ en: txt }]);
      } else if (edit === "new") {
        setJustification([...justification, { en: txt }]);
      } else if (edit === "dim" || edit === "dmg") {
        setJustification([...justification, { en: txt, ru: "DMG" }]);
      } else if (edit === "rub") {
        setJustification([...justification, { en: txt, ru: "RUB" }]);
      } else {
        const newVal = [...justification];
        newVal[edit].en = txt;
        setJustification(newVal);
      }
    }
    setEdit(null);
  };
  const copyChat = () => {
    const text =
      "проверь на грамматические, орфографические и пунктуационные ошибки, и приведи список исправлений: " +
      allJust;
    copyToClipboard(text);
  };
  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (!text) return;
    const newVal = [...justification, { en: text }];
    setJustification(newVal);
  };
  const replaceExamples = () => {
    const arr = [...justification];
    const firstElement = arr.shift();
    const replacements = arr.slice();
    let index = 0;
    let replacedCount = 0;
    let res = firstElement.en.replace(/EXAMPLE_[AB]/g, (match) => {
      if (replacedCount >= replacements.length) {
        return match;
      }
      const replacement = replacements[index].en;
      index++;
      replacedCount++;
      return replacement;
    });

    setJustification([
      { en: res, ru: "" },
      ...replacements.slice(replacedCount),
    ]);
  };

  const allJust = concatenateEnFields(justification);
  const toggleShowB = () => setShowB(!showB);

  return (
    <>
      {edit !== null && edit !== "dim" && edit !== "rub" && edit !== "dmg" && (
        <EditBox
          setEdit={setEdit}
          el={
            edit === "all"
              ? { en: cleanAndCapitalize(allJust) }
              : edit === "new"
              ? { en: "" }
              : justification[edit]
          }
          savefn={refresh}
        />
      )}
      {(edit === "dim" ||
        justification[edit]?.ru === "DIM" ||
        edit === "dmg" ||
        justification[edit]?.ru === "DMG") && (
        <EditDmgBox
          setEdit={setEdit}
          el={justification[edit]?.en}
          savefn={refresh}
        />
      )}

      {(edit === "rub" || justification[edit]?.ru === "RUB") && (
        <RubBox
          setEdit={setEdit}
          el={justification[edit]?.en}
          savefn={refresh}
        />
      )}

      <div className="just-menu ">
        <div className="btnsJust justif-all-btn">
          <Button onClick={() => setEdit("new")}>add</Button>
          <Button onClick={() => setEdit("dmg")}>dmg</Button>
          <Button onClick={() => setEdit("rub")}>Rub</Button>
          <TxtBtnsOverlay toJustif={toJustif} />
          <Button onClick={() => setJustification([])} disabled={!allJust}>
            <GrClearOption />
            clear
          </Button>
          <Button
            disabled={!allJust}
            className="btnToHis"
            onClick={(e) => copyToClipboard(allJust)}>
            <RxCopy />
            copy
          </Button>{" "}
          <Button onClick={pasteFromClipboard} className="color">
            <MdOutlineContentPaste />
            paste
          </Button>
        </div>
      </div>
      {justification.length > 0 && (
        <div className="justif glas">
          <h1>COMMENT</h1>
          {showB ? (
            <div className="justif-body commTxt">{allJust}</div>
          ) : (
            <JustifBody
              justification={justification}
              setJustification={setJustification}
              setEdit={setEdit}
              compliteCrit={compliteCrit}
            />
          )}
        </div>
      )}
      {justification.length > 0 && (
        <div className="just-menu d-flex justify-content-between align-items-center">
          <div className="justif-all-btn">
            {" "}
            <Button onClick={() => setEdit("all")}>
              <GrConnect /> join and edit
            </Button>
            <Button
              onClick={replaceExamples}
              title="replace EXAMPLES in the first justification element with other justification elements">
              Examples
            </Button>
            <Button onClick={toggleShowB} className="mb-2">
              show comment as text
            </Button>
            <Button onClick={copyChat}>
              <IoChatbubblesOutline /> COPY FOR CHAT
            </Button>
          </div>
        </div>
      )}
      {edit === null && <VoiceOverlay toJustif={toJustif} />}
    </>
  );
};

export default Justification;
