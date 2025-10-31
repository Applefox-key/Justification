import React, { useEffect, useRef, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { TfiSave } from "react-icons/tfi";
import { getSet, saveArrToHistory } from "../../utils/localStorage";
import useSaveShortcut from "../../hooks/useSaveShortcut";
import { sAlert } from "../../utils/alert";
import { constructDefItem } from "../../utils/dimentions";
// import { constructDefItem } from "../../constants/textParts";

const BtnArchive = ({ txt, setTxt }) => {
  const txtRef = useRef(txt);
  const setPopup = usePopup();

  // Состояние архива
  const [archiveLS, setArchiveLS] = useState(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });
  const checkEmptyFields = (obj) => {
    //false- not empty true empty
    // Перебираем все ключи объекта
    for (let key in obj) {
      // Пропускаем ключи setName и likert
      if (key === "setName" || key === "likert" || key === "Evals") continue;
      // Проверяем, что значение поля пустое или равно нулю
      if (obj[key] !== "" && obj[key] !== 0) {
        console.log(key);

        return false; // Если нашли значение, которое не пустое и не 0
      }
    }
    // Если все проверки прошли, возвращаем true
    return true;
  };
  // Обновляем ref при изменении txt
  useEffect(() => {
    txtRef.current = txt;
  }, [txt]);

  // Основная функция сохранения
  const saveItems = (isAutoSave = false) => {
    const currentTxt = txtRef.current || txt;
    if (!currentTxt) return;
    if (checkEmptyFields(currentTxt)) return;

    // const txtToSave = { ...currentTxt };

    // Присвоение дефолтных значений
    // if (!txtToSave.id && !txtToSave.name) {
    //   txtToSave.id = "autosave";
    //   txtToSave.name = "last task";
    // } else {

    let needSave = {};
    if (!currentTxt.id) needSave = { id: isAutoSave ? "autosave" : "save-" + archiveLS.length };
    if (!currentTxt.name) needSave.name = isAutoSave ? "last task (autosave)" : "Noname";
    if (Object.keys(needSave).length) {
      setTxt({ ...txt, ...needSave });
    }
    const txtToSave = { ...currentTxt, ...needSave };

    // Проверка существования объекта по id+name
    const existingIndex = archiveLS.findIndex((item) => item.id === txtToSave.id);

    let updatedItems;
    let msg = "";
    if (existingIndex !== -1) {
      // Обновляем существующий
      updatedItems = [...archiveLS];
      updatedItems[existingIndex] = txtToSave;
      msg = `${txtToSave.name} | has been updated in the archive${isAutoSave ? " (AUTOSAVE)" : ""}`;
    } else {
      // Добавляем новый в начало
      updatedItems = [txtToSave, ...archiveLS];
      msg = `${txtToSave.name} | has been added to the archive${isAutoSave ? " (AUTOSAVE)" : ""}`;
    }
    setArchiveLS(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setPopup(msg);
  };

  const handleSave = () => saveItems();

  // Горячие клавиши сохранения
  useSaveShortcut(handleSave);

  // Автосейв при размонтировании
  // useEffect(() => {
  //   return () => saveItems(true);
  // }, []);
  useEffect(() => {
    return () => {
      saveItems(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const getElementsByNamePattern = () => {
  //   const baseName = txt.name;
  //   if (!baseName) return; // no name - return
  //   const regex = new RegExp(`^${baseName.replace(/\d+$/, "")}\\d*$`); //find names without suffix
  //   // find elements with name
  //   const matchedElements = archiveLS.filter(
  //     (item) => regex.test(item.name) && item.id === txt.id
  //   );

  //   const result = matchedElements
  //     .map(
  //       (item) =>
  //         `turn ${item.name.match(/\d+$/)?.[0] || "unknown"}: ${item.review}`
  //     )
  //     .join("\n");
  //   copyToClipboard(result || "No matching elements found");
  // };
  // const save4Items = () => {
  //   if (txt && !archiveLS.includes(txt)) {
  //     const txtArr = [1, 2, 3, 4].map((el) => {
  //       return { ...txt, name: txt.name + el };
  //     });

  //     localStorage.setItem("items", JSON.stringify([...txtArr, ...archiveLS]));
  //     setArchiveLS([...txtArr, ...archiveLS]);
  //     setTxt({ ...txt, name: txt.name + "1" });
  //     setPopup("info has been added to the archive");
  //   }
  // };
  // const replacelast = () => {
  //   const old = [...archiveLS];
  //   old[0] = txt;
  //   if (txt && !archiveLS.includes(txt)) {
  //     localStorage.setItem("items", JSON.stringify(old));
  //     setArchiveLS(old);
  //   }
  // };
  const replaceItems = (item) => {
    let setN = (item ? item.setName : "") || getSet();
    // if ((setN = "")) setN = getSet();

    const defEl = constructDefItem(setN);
    const nitem = item ? { ...defEl, ...item } : defEl;

    setTxt(nitem);
  };
  const clearItems = () => {
    saveArrToHistory(
      archiveLS.map((el) => {
        const handleTxt = JSON.stringify(el);
        return { en: handleTxt, ru: "DIM" };
      })
    );
    setArchiveLS([]);

    localStorage.setItem("items", JSON.stringify([]));
  };
  const clearItem = async (index) => {
    const result = await sAlert({
      title: "Delete save? ",
      // text: "task will be cleared",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const newItems = archiveLS.filter((_, i) => i !== index);

      localStorage.setItem("items", JSON.stringify(newItems));
      setArchiveLS(newItems);
    }
  };

  return (
    <>
      <div className="fragmBtn">
        <button className=" btnToHis hintBtn ms-1" onClick={handleSave} title="to and from archive">
          <TfiSave />
        </button>
        <div className="archive-box">
          <button onClick={clearItems}>clear</button>
          {archiveLS.map((oneF, i) => (
            <div className="one-item" key={i}>
              <div className="d-flex">
                <button onClick={() => replaceItems(oneF)} className="loadbtn ">
                  LOAD
                </button>{" "}
                <button onClick={() => clearItem(i)} className="delbtn ">
                  DELETE
                </button>{" "}
                <div className="contentbtn ">
                  🔍
                  <div className="save-cont">
                    {oneF.name && (
                      <span className="spanName">
                        {oneF.id}-{oneF.name}
                      </span>
                    )}
                    {oneF.Prompt && <span>{oneF.Prompt}</span>}
                  </div>
                </div>
              </div>
              <div className="title">
                {oneF.name ?? "empty name"}
                <span className="spanid"> {oneF.id ?? "no id"}</span>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BtnArchive;
