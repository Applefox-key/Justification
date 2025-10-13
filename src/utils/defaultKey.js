import { applyAction, editTextAction } from "./utilStr";

export const defaultKey = (e, fieldId, value, setValue, action) => {
  let type = "";
  if (e.key === "F4") {
    const val = value;
    const newVal = applyAction(val, action);
    setValue(newVal);
    type = "";
  } else if (e.key === "F2") {
    type = "englBaseComm";
  } else if (
    e.ctrlKey &&
    (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "в")
  ) {
    e.preventDefault();
    type = "getFragment";
  } else if (
    e.altKey &&
    (e.key.toLowerCase() === "q" || e.key.toLowerCase() === "й")
  ) {
    type = "upFirst";
  }
  if (
    e.altKey &&
    (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "ц")
  ) {
    type = "up";
  } else if (
    e.altKey &&
    (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "ф")
  ) {
    type = "down";
  }
  if (type) editTextAction(fieldId, value, setValue, type, true);
};
