import { hotbtnsArrDef } from "../constants/replacements";
import { textParts } from "../constants/textParts";
import { baseRespName } from "./utilStr";

export const toLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const fromLS = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
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

export const setRespNames = (action, setAction) => {
  const keys = Object.keys(baseRespName);
  const currentIndex = keys.indexOf(action);
  const nextIndex = (currentIndex + 1) % keys.length;
  const newV = Object.keys(baseRespName)[nextIndex];
  localStorage.setItem("lastAction", newV);
  setAction(newV);
};
