import React, { useEffect, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { TfiSave } from "react-icons/tfi";
import { saveArrToHistory } from "../../utils/localStorage";
import useSaveShortcut from "../../hooks/useSaveShortcut";

const RubArchive = ({ txt, setTxt }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("itemsrub");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // remember quotes from the text
  const saveItems = () => {
    if (!txt) return;
    if (txt.taskId) {
      const existingIndex = items.findIndex(
        (item) => item.taskId === txt.taskId
      );
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
  // const getElementsByNamePattern = () => {
  //   const baseName = txt.name;
  //   if (!baseName) return; // no name - return
  //   const regex = new RegExp(`^${baseName.replace(/\d+$/, "")}\\d*$`); //find names without suffix
  //   // find elements with name
  //   const matchedElements = items.filter(
  //     (item) => regex.test(item.name) && item.id === txt.id
  //   );
  //   // Формирование текста результата
  //   const result = matchedElements
  //     .map(
  //       (item) =>
  //         `turn ${item.name.match(/\d+$/)?.[0] || "unknown"}: ${item.review}`
  //     )
  //     .join("\n");
  //   copyToClipboard(result || "No matching elements found");
  // };
  // const save4Items = () => {
  //   if (txt && !items.includes(txt)) {
  //     const txtArr = [1, 2, 3, 4].map((el) => {
  //       return { ...txt, name: txt.name + el };
  //     });

  //     setItems([...txtArr, ...items]);
  //     setTxt({ ...txt, name: txt.name + "1" });
  //     setPopup("info has been added to the archive");
  //   }
  // };
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
    if (it.taskId === "") it.taskId = "save" + i;
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
          <button onClick={replacelast}>replace last</button>{" "}
          {/* <div className="archive-last" title="last 4 saves (turns)s">
            <button onClick={save4Items}>+4 turns</button>{" "}
            <button onClick={getElementsByNamePattern}>
              get all turns review
            </button>
          </div> */}
          <button onClick={clearItems}>clear</button>
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
                {oneF.taskId ? oneF.taskId : "save" + (items.length - i)}
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
      {/* <button
        className="square-btn intense"
        title="replace dash"
        onClick={() => replace("-", "—")}>
        -
      </button>{" "}
      <button
        className="square-btn intense"
        title="replace quotes"
        onClick={replaceQuotes}>
        «»
      </button> */}
    </>
  );
};

export default RubArchive;
