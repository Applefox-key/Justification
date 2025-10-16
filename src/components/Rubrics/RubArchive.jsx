import React, { useEffect, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { TfiSave } from "react-icons/tfi";
import { saveArrToHistory } from "../../utils/localStorage";
import useSaveShortcut from "../../hooks/useSaveShortcut";
import { defaultRubricator } from "../../constants/rubricsTemplates";

const RubArchive = ({ txt, setTxt }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("itemsrub");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // remember quotes from the text
  const saveItems = () => {
    if (!txt) return;
    if (txt.id) {
      const existingIndex = items.findIndex((item) => item.id === txt.id);
      if (existingIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingIndex] = txt;
        setItems(updatedItems);
        setPopup("info has been updated in the archive");
        return;
      }
    } else if (txt.name) {
      const existingIndex = items.findIndex((item) => item.name === txt.name);
      if (existingIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingIndex] = txt;
        setItems(updatedItems);
        setPopup("info has been updated in the archive");
        return;
      }
    }

    if (txt && !items.includes(txt)) {
      setItems([txt, ...items]);
      setPopup("info has been added to the archive");
    }
  };

  const replacelast = () => {
    const old = [...items];

    old[0] = txt;
    if (txt && !items.includes(txt)) {
      setItems(old);
    }
  };

  useEffect(() => {
    localStorage.setItem("itemsrub", JSON.stringify(items));
  }, [items]);
  //back to the text
  const replaceItems = (item, i) => {
    const it = item;
    if (it.id === "") it.id = "save" + i;

    const rubr = it.rubricator ? it.rubricator : [];
    if (rubr.length > 0) {
      const newR = rubr.map((r) => {
        return { ...defaultRubricator, ...r };
      });
      it.rubricator = newR;
    }

    setTxt(it);
    // setHandleTxt(newString);
  };
  const clearItems = () => {
    saveArrToHistory(
      items.map((el) => {
        const handleTxt = JSON.stringify(el);
        return { en: handleTxt, ru: "DIM" };
      })
    );
    setItems([]);
  };
  const clearItem = (index) => {
    if (window.confirm("Delete save?")) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };
  const setPopup = usePopup();
  useSaveShortcut(saveItems);
  return (
    <>
      <div className="fragmBtn">
        <button
          className=" btnToHis hintBtn ms-1"
          onClick={saveItems}
          title="to and from archive">
          <TfiSave />
        </button>
        <div className="archive-box">
          <div className="d-flex w-100">
            <button onClick={replacelast}>replace last</button>{" "}
            <button onClick={clearItems}>clear</button>
          </div>
          {/* <div className="archive-last" title="last 4 saves (turns)s">
            <button onClick={save4Items}>+4 turns</button>{" "}
            <button onClick={getElementsByNamePattern}>
              get all turns review
            </button>
          </div> */}
          {items.map((oneF, i) => (
            <div className="one-item" key={i}>
              {/* <div className="d-flex justify-content-between"> */}
              <div className="d-flex">
                <button
                  onClick={() => replaceItems(oneF, items.length - i)}
                  className="loadbtn ">
                  LOAD
                </button>{" "}
                <button onClick={() => clearItem(i)} className="delbtn ">
                  DELETE
                </button>
              </div>
              <div className="title">
                {oneF.name
                  ? oneF.name
                  : oneF.id
                  ? oneF.id
                  : "save" + (items.length - i)}
              </div>
              {/* </div> */}
              <div className="save-cont">
                {oneF.name && <span className="spanName">{oneF.name}</span>}
                {oneF.prompt && <span>{oneF.prompt}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RubArchive;
