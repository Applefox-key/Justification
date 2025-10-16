import { hotbtnsArrDef } from "../constants/hotPaste";
import { defaultRubJust } from "../constants/rubricsTemplates";
import { textParts } from "../constants/textParts";
import { constructDefItem } from "./dimentions";
import { baseRespName } from "./utilStr";
import isEqual from "lodash/isEqual";

export const toLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const fromLS = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
export const getSet = () => {
  const setN = fromLS("justset");
  if (!setN) toLS("justset", "set1");
  return setN || "set1";
};
export const setSet = (val) => {
  if (val) toLS("justset", val);
};
export const saveToHistory = (el) => {
  let val = fromLS("History");
  if (val === null) toLS("History", [el]);
  else {
    val.unshift(el);
    toLS("History", val);
  }
  // toLS("History", val === null ? [el] : [...val, el]);
};
export const saveToHistorygeneral = (el, setPopup = null) => {
  if (el === "") return;
  const type = el.ru;

  if (type === "RUB" && isEqual(el.en, defaultRubJust)) return;
  if (type === "DIM") {
    const set = el.en.setName || getSet();
    const defVal = constructDefItem(set);
    if (isEqual(el.en, defVal)) return;
  }
  saveToHistory(el);
  if (setPopup !== null) setPopup("info has been added to the history");
};

export const saveArrToHistory = (elArr) => {
  let val = fromLS("History");
  toLS("History", val === null ? [...elArr] : [...val, ...elArr]);
};
export const getHistory = () => {
  let val = fromLS("History");

  const his = {
    name: "history",
    hint: [],
    items: [{ name: "history", items: val === null ? [] : val }],
  };
  return his;
};

export const delFromHistory = (i) => {
  let val = fromLS("History");
  let newVal = val.slice(0, i).concat(val.slice(i + 1));
  toLS("History", newVal);
};
export const setBackgroundAndSave = (newVal) => {
  const imgF = require(`../img/img${newVal}.jpg`);

  document.documentElement.style.setProperty("--img-back", `url(${imgF})`);
  toLS("backgr", newVal);
};
export const firstBack = () => {
  let img_ = JSON.parse(localStorage.getItem("backgr"));
  if (img_ === undefined || img_ === null) return;
  const imgF = require(`../img/img${img_}.jpg`);
  document.documentElement.style.setProperty("--img-back", `url(${imgF})`);
};
export const currentBack = () => {
  const storedI = JSON.parse(localStorage.getItem("backgr"));
  return storedI;
};

export const txtTemplatesGet = () => {
  let val = fromLS("txtTmp");
  if (val === null) return textParts;
  return val;
};
export const txtTemplatesSet = (val = null, setArr = null) => {
  if (val === null) {
    localStorage.removeItem("txtTmp");
    if (setArr !== 0) setArr(textParts);
    return;
  }
  toLS("txtTmp", val.items);
  if (setArr !== 0) setArr(val.items);
};

export const txtHotReplaceGet = () => {
  let val = fromLS("txtHotRepl");
  if (val === null) return hotbtnsArrDef;
  return val;
};

export const setRespNames = (action, setAction, currentI = null) => {
  const keys = Object.keys(baseRespName);
  const currentIndex = keys.indexOf(action);
  const nextIndex =
    currentI === null ? (currentIndex + 1) % keys.length : currentI;
  const newV = Object.keys(baseRespName)[nextIndex];
  localStorage.setItem("lastAction", newV);
  setAction(newV);
};

export const saveToArchItems = (
  txtRef,
  archiveLS,
  setArchiveLS,
  setPopup,
  isAutoSave = false
) => {
  if (!txtRef.current) return;

  const txtToSave = { ...txtRef.current };

  if (isAutoSave && !txtToSave.id && !txtToSave.name) {
    txtToSave.id = "autosave";
    txtToSave.name = "last task";
  }

  if (!isAutoSave && !txtToSave.name) {
    txtToSave.name = "save" + archiveLS.length;
  }

  const existingIndex = archiveLS.findIndex((item) => {
    if (txtToSave.id && txtToSave.name) {
      return item.id === txtToSave.id && item.name === txtToSave.name;
    } else if (txtToSave.id) {
      return item.id === txtToSave.id && (!item.name || item.name === "");
    } else if (txtToSave.name) {
      return item.name === txtToSave.name && (!item.id || item.id === "");
    }
    return false;
  });

  if (existingIndex !== -1) {
    const updatedItems = [...archiveLS];
    updatedItems[existingIndex] = txtToSave;
    localStorage.setItem("items", JSON.stringify(updatedItems));
    if (!isAutoSave) setArchiveLS(updatedItems);
    setPopup(
      txtToSave.name +
        "| has been updated in the archive " +
        (isAutoSave ? " (AUTOSAVE)" : "")
    );
    return;
  }

  localStorage.setItem("items", JSON.stringify([txtToSave, ...archiveLS]));
  if (!isAutoSave) setArchiveLS([txtToSave, ...archiveLS]);

  setPopup(
    txtToSave.name +
      "| has been added to the archive " +
      (isAutoSave ? " (AUTOSAVE)" : "")
  );
};
