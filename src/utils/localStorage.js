import { arrImg, imgCount } from "../constants/images";

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

export const setBackgroundAndSave = (next = 0) => {
  const storedI = JSON.parse(localStorage.getItem("backgr"));
  let old;
  let newVal;

  if (storedI !== undefined) {
    old = storedI;
  } else {
    old = 0;
  }
  newVal = old;
  if (next) newVal = old === imgCount - 1 ? 0 : old + next;

  // const arrEl = arrImg.find((el) => el.id === i);

  if (arrImg) {
    const mainp = document.getElementById("mainp");
    if (mainp) {
      mainp.classList.remove("bg" + old);
      mainp.classList.add("bg" + newVal);

      if (!!next) toLS("backgr", newVal);
    } else {
      console.error("Element with id 'mainp' not found.");
    }
  } else {
  }
};
