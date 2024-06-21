import React, { useState } from "react";
import EditBox from "./EditBox";
import { Button } from "react-bootstrap";
import JustifBody from "./JustifBody";
import {
  cleanAndCapitalize,
  concatenateEnFields,
  copyToClipboard,
  replaceWords,
} from "../utils/utilStr";
import TxtBtnsOverlay from "./TxtBtnsOverlay";
import { RxCopy } from "react-icons/rx";
import { MdOutlineContentPaste } from "react-icons/md";
import { SlMagicWand } from "react-icons/sl";
import { GrClearOption, GrConnect } from "react-icons/gr";
import { IoChatbubblesOutline } from "react-icons/io5";

const Justification = ({ justification, setJustification, compliteCrit }) => {
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
  const copyChat = () => {
    const text =
      "проверь на грамматические, орфографические и пунктуационные ошибки, и приведи список исправлений: " +
      allJust;
    copyToClipboard(text);
  };
  const replaceSome = () => {
    const text = replaceWords(allJust);
    setJustification([{ en: text, ru: "" }]);
  };
  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    const newVal = [...justification, { en: text }];
    // setPreviousTxt(handleTxt);
    setJustification(newVal);
  };
  const replaceExamples = () => {
    // if (!justification.length) return;
    const arr = [...justification];
    // Отделяем первый элемент
    const firstElement = arr.shift();

    // Создаем новый массив из оставшихся элементов
    const replacements = arr.slice();
    let index = 0;
    let replacedCount = 0;
    let res = firstElement.en.replace(/EXAMPLE_[AB]/g, (match) => {
      if (replacedCount >= replacements.length) {
        return match; // Возвращаем оригинальный фрагмент, если закончились замены
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

  return (
    <>
      {edit !== null && (
        <EditBox
          setEdit={setEdit}
          el={
            edit === "all"
              ? { en: cleanAndCapitalize(allJust) }
              : justification[edit]
          }
          savefn={refresh}
        />
      )}{" "}
      <div className="just-menu ">
        <div className="btnsJust justif-all-btn">
          <Button onClick={() => setEdit("all")}>edit</Button>{" "}
          <Button onClick={pasteFromClipboard} className="color">
            <MdOutlineContentPaste />
            paste
          </Button>
          {allJust && (
            <>
              <Button
                className="btnToHis"
                onClick={(e) => copyToClipboard(allJust)}>
                <RxCopy />
                copy
              </Button>{" "}
              <Button
                onClick={() => setJustification([{ en: allJust, ru: "" }])}>
                <GrConnect />
                join
              </Button>{" "}
              <Button onClick={() => setJustification([])}>
                <GrClearOption />
                clear
              </Button>
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
          compliteCrit={compliteCrit}
        />{" "}
      </div>{" "}
      {/* <div className="d-flex justify-content-between align-items-center"> */}
      <div className="just-menu d-flex justify-content-between align-items-center">
        <TxtBtnsOverlay toJustif={toJustif} copyChat={copyChat} />
        <div>
          {justification.length > 1 && (
            <Button
              onClick={replaceExamples}
              title="replace EXAMPLES in the first justification element with other justification elements">
              Examples
            </Button>
          )}
          {justification.length > 0 && (
            <>
              <Button onClick={replaceSome}>
                <SlMagicWand />
                MAGIC
              </Button>
              <Button onClick={copyChat}>
                <IoChatbubblesOutline /> COPY FOR CHAT
              </Button>
            </>
          )}
        </div>
      </div>
      {allJust && <div className="justif-all">{allJust}</div>}
    </>
  );
};

export default Justification;
