import { textParts } from "../constants/textParts";

export const toLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const fromLS = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const saveToHistory = (el) => {
  let val = fromLS("History");
  toLS("History", val === null ? [el] : [...val, el]);
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
  const storedI = JSON.parse(localStorage.getItem("backgr"));
  let old;

  if (storedI !== undefined) {
    old = storedI;
  } else {
    old = 0;
  }
  const img_ = require(`../img/img${newVal}.jpg`);
  document.documentElement.style.setProperty("--img-back", `url(${img_})`);
  toLS("backgr", newVal);
};
export const firstBack = () => {
  const storedI = JSON.parse(localStorage.getItem("backgr"));
  let old;
  if (storedI !== undefined) {
    old = storedI;
    const img_ = require(`../img/img${old}.jpg`);
    document.documentElement.style.setProperty("--img-back", `url(${img_})`);
  } else {
    old = 0;
  }
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
