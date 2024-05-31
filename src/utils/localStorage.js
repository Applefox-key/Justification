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
