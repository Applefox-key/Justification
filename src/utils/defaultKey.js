import { applyAction, editTextAction, highlightWordsFromCursor } from "./utilStr";

export const defaultKeysList = `Ctrl+D: get fragment
Ctrl+A: case down
Ctrl+W: case up
Ctrl+Q: case up first
Ctrl+D: get fragment
Alt+D: add fragment to buff
Alt+E: clear buff
Alt+X: copy with new row
Alt+Z: copy with coma
`;
const onKeyDownQuots = (e, setValue) => {
  const el = e.target;
  if (!el || typeof el.selectionStart !== "number") return;

  // нормализуем нажатую "символьную" клавишу
  let keyNorm = e.key;
  if (e.key === "9" && e.shiftKey) keyNorm = "("; // Shift+9 -> "("

  // интересуют только " или (
  if (!['"', "("].includes(keyNorm)) return;

  const pairs = {
    '"': ['"', '"'],
    "(": ["(", ")"],
  };

  const pair = pairs[keyNorm];
  if (!pair) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;

  // подготовим текущее значение
  const value = el.value;

  // если есть выделение — оборачиваем полностью выделенный фрагмент
  if (end > start) {
    e.preventDefault();
    const selectedText = value.slice(start, end); // <--- важно: end, не end-1

    const newValue = value.slice(0, start) + pair[0] + selectedText + pair[1] + value.slice(end);
    setValue(newValue);

    // установить курсор после закрывающей кавычки/скобки
    const newPos = start + pair[0].length + selectedText.length + pair[1].length;
    // ставим через таймаут, чтобы DOM обновился (если setValue асинхронен)
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(newPos, newPos);
    }, 0);

    return;
  }

  // если нет выделения — вставляем пару и ставим курсор между ними
  e.preventDefault();
  const before = value.slice(0, start);
  const after = value.slice(start);
  const newValue = before + pair[0] + pair[1] + after;
  setValue(newValue);

  const cursorPos = start + pair[0].length; // между открывающей и закрывающей
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(cursorPos, cursorPos);
  }, 0);
};

export const defaultKey = (e, fieldId, value, setValue, action) => {
  let type = "";
  // Проверка на Alt + цифру (1–9)
  if (e.altKey && /^[1-9]$/.test(e.key)) {
    e.preventDefault();
    const count = Number(e.key);
    highlightWordsFromCursor(e.target, count);
    return; // не продолжаем обработку
  }
  if (e.key === "F4") {
    const val = value;
    // const newVal = applyAction(val, action);
    const newVal = applyAction({ text: val, action, toLowerC: true });
    setValue(newVal);
    type = "";
  } else if (e.key === "F2") {
    type = "englBaseComm";
  } else if (['"', "("].includes(e.key)) onKeyDownQuots(e, setValue);
  else if (e.ctrlKey && (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "в")) {
    e.preventDefault();
    type = "getFragment";
  } else if (e.altKey && (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "в")) {
    e.preventDefault();
    type = "addFragment";
  } else if (e.altKey && (e.key.toLowerCase() === "e" || e.key.toLowerCase() === "у")) {
    e.preventDefault();
    type = "clearClipboard";
  } else if (e.altKey && (e.key.toLowerCase() === "q" || e.key.toLowerCase() === "й")) {
    type = "upFirst";
  }
  if (e.altKey && (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "ц")) {
    type = "up";
  } else if (e.altKey && (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "ф")) {
    type = "down";
  }
  if (type) editTextAction(fieldId, value, setValue, type, true);
};
