import React from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import DownloadHisBtn from "./DownloadHisBtn";
import FileChooseMenu from "../UI/FileChooseMenu";
import FileChooseBtn from "../UI/FileChooseBtn";
import { getTxtFile } from "../../utils/readTxt";

const Sheets = ({ currentBtn, curSection, setCurrBtn, setCurSection }) => {
  const handleSwitch = () => {
    if (curSection !== null) {
      setCurSection(null);
      return;
    }
    if (!!currentBtn && currentBtn.items.length > 0)
      setCurSection(currentBtn.items[0]);
  };
  const fileChange = async (file) => {
    const his = await getTxtFile(file);
    const list = his.split("\n\n").map((el) =>
      el.startsWith("DIM-")
        ? {
            ru: "DIM",
            en: el.slice(4).trim(),
          }
        : el.includes("}}")
        ? {
            ru: "DIM",
            en: el.trim(),
          }
        : { en: el.trim() }
    );
    setCurrBtn({
      name: "history",
      hint: [],
      items: [{ name: "history", items: list === "" ? [] : list }],
    });
  };
  return (
    <div className="variants-wrap">
      <div
        className={
          curSection === null
            ? "sheetsXls-wrap  justif-all-btn emptySheet"
            : "sheetsXls-wrap  justif-all-btn"
        }>
        {" "}
        {currentBtn.name === "history" && (
          <FileChooseBtn fileChange={fileChange} />
        )}
        {currentBtn.name === "history" &&
          !!curSection &&
          !!curSection.items &&
          !!curSection.items.length && (
            <DownloadHisBtn list={curSection.items} setCurrBtn={setCurrBtn} />
          )}
        {currentBtn.items.map((el, i) => (
          <div className="sheetsXls" key={i}>
            <div
              className={
                curSection && curSection.name === el.name
                  ? "sheetsXls-item z0 activeEl"
                  : "sheetsXls-item z0"
              }
              onClick={() => {
                if (curSection && el.name === curSection.name) handleSwitch();
                else setCurSection(el);
              }}>
              <div>{el.name}</div>
            </div>{" "}
          </div>
        ))}
        <IoMdArrowDropdown
          onClick={handleSwitch}
          className={
            curSection !== null ? "menuArrow" : "menuArrow menuArrowRight"
          }
        />
      </div>
    </div>
  );
};

export default Sheets;
