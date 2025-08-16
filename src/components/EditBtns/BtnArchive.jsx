import React, { useEffect, useRef, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { TfiSave } from "react-icons/tfi";
import { copyToClipboard } from "../../utils/utilStr";
import { saveArrToHistory } from "../../utils/localStorage";
import useSaveShortcut from "../../hooks/useSaveShortcut";

const BtnArchive = ({ txt, setTxt }) => {
  const txtRef = useRef(txt);
  const setPopup = usePopup();

  // Состояние архива
  const [archiveLS, setArchiveLS] = useState(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });

  // Обновляем ref при изменении txt
  useEffect(() => {
    txtRef.current = txt;
  }, [txt]);

  // Основная функция сохранения
  const saveItems = (isAutoSave = false) => {
    const currentTxt = txtRef.current || txt;
    if (!currentTxt) return;

    const txtToSave = { ...currentTxt };

    // Присвоение дефолтных значений
    if (!txtToSave.id && !txtToSave.name) {
      txtToSave.id = "autosave";
      txtToSave.name = "last task";
    } else {
      if (!txtToSave.id) txtToSave.id = "no-id";
      if (!txtToSave.name) txtToSave.name = "save-" + archiveLS.length;
    }

    // Проверка существования объекта по id+name
    const existingIndex = archiveLS.findIndex(
      (item) => item.id === txtToSave.id && item.name === txtToSave.name
    );

    let updatedItems;
    if (existingIndex !== -1) {
      // Обновляем существующий
      updatedItems = [...archiveLS];
      updatedItems[existingIndex] = txtToSave;
      setPopup(
        `${txtToSave.name} | has been updated in the archive${
          isAutoSave ? " (AUTOSAVE)" : ""
        }`
      );
    } else {
      // Добавляем новый в начало
      updatedItems = [txtToSave, ...archiveLS];
      setPopup(
        `${txtToSave.name} | has been added to the archive${
          isAutoSave ? " (AUTOSAVE)" : ""
        }`
      );
    }

    setArchiveLS(updatedItems);
    console.log(1);
    //  debugger;
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleSave = () => saveItems();

  // Горячие клавиши сохранения
  useSaveShortcut(handleSave);

  // Автосейв при размонтировании
  // useEffect(() => {
  //   return () => saveItems(true);
  // }, []);
  useEffect(() => {
    console.log("Mounted");
    return () => {
      saveItems(true);
      console.log("Unmounted");
    };
  }, []);
  const getElementsByNamePattern = () => {
    const baseName = txt.name;
    if (!baseName) return; // no name - return
    const regex = new RegExp(`^${baseName.replace(/\d+$/, "")}\\d*$`); //find names without suffix
    // find elements with name
    const matchedElements = archiveLS.filter(
      (item) => regex.test(item.name) && item.id === txt.id
    );

    const result = matchedElements
      .map(
        (item) =>
          `turn ${item.name.match(/\d+$/)?.[0] || "unknown"}: ${item.review}`
      )
      .join("\n");
    copyToClipboard(result || "No matching elements found");
  };
  const save4Items = () => {
    if (txt && !archiveLS.includes(txt)) {
      const txtArr = [1, 2, 3, 4].map((el) => {
        return { ...txt, name: txt.name + el };
      });
      console.log(2);
      localStorage.setItem("items", JSON.stringify([...txtArr, ...archiveLS]));
      setArchiveLS([...txtArr, ...archiveLS]);
      setTxt({ ...txt, name: txt.name + "1" });
      setPopup("info has been added to the archive");
    }
  };
  const replacelast = () => {
    const old = [...archiveLS];
    old[0] = txt;
    if (txt && !archiveLS.includes(txt)) {
      console.log(3);
      localStorage.setItem("items", JSON.stringify(old));
      setArchiveLS(old);
    }
  };
  const replaceItems = (item) => {
    setTxt(item);
  };
  const clearItems = () => {
    saveArrToHistory(
      archiveLS.map((el) => {
        const handleTxt = JSON.stringify(el);
        return { en: handleTxt, ru: "DIM" };
      })
    );
    setArchiveLS([]);
    console.log(4);
    localStorage.setItem("items", JSON.stringify([]));
  };
  const clearItem = (index) => {
    if (window.confirm("Delete save?")) {
      const newItems = archiveLS.filter((_, i) => i !== index);
      console.log(5);
      localStorage.setItem("items", JSON.stringify(newItems));
      setArchiveLS(newItems);
    }
  };

  return (
    <>
      <div className="fragmBtn">
        <button
          className=" btnToHis hintBtn ms-1"
          onClick={handleSave}
          title="to and from archive">
          <TfiSave />
        </button>
        <div className="archive-box">
          <button onClick={replacelast}>replace last</button>{" "}
          <div className="archive-last" title="last 4 saves (turns)s">
            <button onClick={save4Items}>+4 turns</button>{" "}
            <button onClick={getElementsByNamePattern}>
              get all turns review
            </button>
          </div>
          <button onClick={clearItems}>clear</button>
          {archiveLS.map((oneF, i) => (
            <div className="one-item" key={i}>
              <div className="d-flex">
                <button onClick={() => replaceItems(oneF)} className="loadbtn ">
                  LOAD
                </button>{" "}
                <button onClick={() => clearItem(i)} className="delbtn ">
                  DELETE
                </button>
              </div>
              <div className="title">
                {oneF.name ? oneF.name : "save" + (archiveLS.length - i)}
              </div>
              <div className="save-cont">
                {oneF.name && <span className="spanName">{oneF.name}</span>}
                {oneF.Rate && <span>{oneF.Rate}</span>}
                {oneF.R3 && <span>{oneF.R3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BtnArchive;
