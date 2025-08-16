import {
  replacementsGeneral,
  replacementsInteractions,
  replacementsPunctuation,
  replacementsResponses,
  replacementsResponsesNum,
  replacementsResponsesNum2,
} from "../constants/replacements";
import { defaultDim, defaultDimSets } from "../constants/textParts";
const escapeSpecialCharacters = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
// export const concatenateEnFields = (justification) => {
//   if (!justification.length) return "";
//   return justification
//     .map((obj) => obj.en)
//     .reduce((acc, val) => {
//       if (val === "." || val === ",") {
//         return acc + val;
//       }
//       let formatVal = acc.endsWith(".")
//         ? val.charAt(0).toUpperCase() + val.slice(1)
//         : val;
//       formatVal = formatVal.replace("respond ", "Respond ");
//       if (!acc)
//         formatVal = formatVal.charAt(0).toUpperCase() + formatVal.slice(1);
//       return acc + " " + formatVal;
//     }, "")
//     .trim();
// };

export async function copyFromTextarea() {
  const textarea = document.getElementById("edit");

  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Не удалось скопировать текст: ", err);
  }
}

export const copyToClipboard = async (text, popup = null) => {
  try {
    await navigator.clipboard.writeText(text);
    if (popup !== null) popup("copied to the clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    if (popup !== null) popup("Failed to copy to the clipboard");
  }
};

const sentencesCaps = (text, exceptions = new Set()) => {
  // // Putting the sentences back into the text
  // return sentences.join("");
  let sentences = text.split(/([.!?]\s*)/);

  for (let i = 0; i < sentences.length; i++) {
    let words = sentences[i].split(/\b/); // разбиваем по словам
    for (let j = 0; j < words.length; j++) {
      const wordLower = words[j].toLowerCase();
      if (exceptions.has(wordLower)) {
        words[j] = wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
      }
    }

    if (words[0] && /[a-zа-яё]/i.test(words[0].charAt(0))) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }

    sentences[i] = words.join("");
  }

  return sentences.join("");
};
export const replaceQuotes3 = (txt) => {
  if (!txt) return "";
  let isOpening = true;
  let newVal = txt.replace(/"/g, () => {
    if (isOpening) {
      isOpening = false;
      return "“";
    } else {
      isOpening = true;
      return "”";
    }
  });

  newVal = newVal.replace(/“\s+/g, "“");
  newVal = newVal.replace(/“\s+/g, "”");
  newVal = newVal.replace(/«/g, "“");
  newVal = newVal.replace(/»/g, "”");
  return newVal;
};
export const cleanAndCapitalize = (text) => {
  // text = text.replace(/\s+/g, " ").trim();
  const alwaysCapitalize = new Set(["i", "english", "russian"]);
  text = text.trim();
  text = text.replace(/ +/g, " ").replace(/ ?\n ?/g, "\n");
  // text = text.replace(/\.\./g, ".");
  text = text.replace(/(?<!\.)\.{2}(?!\.)/g, "."); // only 2 periods
  text = text.replace(/(?<!\.)\.{4,}(?!\.)/g, "..."); //only 4+ periods
  text = text.replace(/\s\./g, ".");
  text = text.replace(/\s:/g, ":");
  text = text.replace(/\s,/g, ",");
  text = text.replace(/\(\s+/g, "(");
  text = text.replace(/\s+\)/g, ")");
  text = text.replace(/([«“])\s+/g, "$1");
  text = text.replace(/\s+([»”])/g, "$1");
  //  links
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let parts = text.split(/(\n+|https?:\/\/[^\s]+|[“”"«»][^“”"«»]*?[“”"«»])/g);

  // capitalise all exept links
  parts = parts.map((part) => {
    if (
      urlRegex.test(part) ||
      part.startsWith("\n") ||
      /^[“”"«»].*[“”"«»]$/.test(part)
    ) {
      // a link or new line
      return part;
    } else {
      // not a link
      part = part.toLowerCase();
      part = sentencesCaps(part, alwaysCapitalize);
      return part;
    }
  });

  // combine
  text = parts.join("");
  if (!/[.,:!?]$/.test(text.trim()) && text.split(" ").length > 2) {
    return text.trim() + ".";
  }

  return text;
};

const replaceByArr = (replacementsArr, text) => {
  if (!text) return "";
  replacementsArr.forEach(({ oldT, newT, caseSensitive }) => {
    oldT.forEach((oldWord) => {
      const flags = caseSensitive ? "g" : "gi";
      const regex = new RegExp(escapeSpecialCharacters(oldWord), flags);
      // Replacing all occurrences of old Word with newT
      text = text.replace(regex, newT);
    });
  });
  return text;
};
export const replacePunctuations = (allJust) => {
  return replaceByArr(replacementsPunctuation, allJust);
};
export const replacegen = (txt) => {
  let tmpText = replacePunctuations(txt);
  tmpText = cleanAndCapitalize(tmpText);
  // Replace all sequences of spaces with a single space
  // tmpText = tmpText.replace(/\s+/g, " ");
  return replaceByArr(replacementsGeneral, tmpText);
};
export const replaceWords = (allJust) => {
  allJust = replacegen(allJust);
  return replaceByArr(replacementsResponses, allJust);
};
export const replaceWordsInteractions = (allJust) => {
  allJust = replacegen(allJust);
  return replaceByArr(replacementsInteractions, allJust);
};
export const replaceNum = (text, setText) => {
  text = replacegen(text);

  return replaceByArr(replacementsResponsesNum, text);
};
export const replaceNum2 = (text, setText) => {
  text = replacegen(text);

  return replaceByArr(replacementsResponsesNum2, text);
};
export const numIsteadLetter = (text, setText) => {
  text = replacegen(text);

  let newTxt = replaceByArr(replacementsResponsesNum, text);
  setText(newTxt);
};
export const highlightedText1 = (text) => {
  const parts = text.split(/(example|response A|response B)/gi); // Split the text by "example", keeping the word itself
  return parts
    .map((part, index) => {
      if (part.toLowerCase() === "example")
        return (
          <span className="highlight" key={index}>
            {part}
          </span>
        );
      else if (part.toLowerCase() === "response a")
        return (
          <span className="highlight-blue" key={index}>
            {part}
          </span>
        );
      else if (part.toLowerCase() === "response b")
        return (
          <span className="highlight-blueB" key={index}>
            {part}
          </span>
        );
      else return part;
    })
    .join("");
};
export const highlightedText = (text, compliteCrit = []) => {
  const regArrA = ["response a", "interaction a", "@response 1"];
  const regArrB = ["response b", "interaction b", "@response 2"];
  const exArr = ["example_b", "example_a"];
  const regArr = ["some", "major", "minor", "no problems"];
  const regexPattern = new RegExp(
    `(${[...compliteCrit, ...regArrA, ...regArrB, ...regArr, ...exArr].join(
      "|"
    )})`,
    "gi"
  );
  // Split the text by "example", keeping the word itself
  const parts = text.split(regexPattern); // Split the text by "example", keeping the word itself
  return parts.map((part, index) => {
    if (regArrA.includes(part.toLowerCase()))
      return (
        <span className="highlight-blue" key={index}>
          {part}
        </span>
      );
    else if (
      compliteCrit.includes(part) ||
      compliteCrit.includes(part.toLowerCase())
    )
      return (
        <span className="highlight-crit" key={index}>
          {part}
        </span>
      );
    else if (regArrB.includes(part.toLowerCase()))
      return (
        <span className="highlight-blueB" key={index}>
          {part}
        </span>
      );
    else if (exArr.includes(part.toLowerCase()))
      return (
        <span className="highlight-ex" key={index}>
          {part}
        </span>
      );
    else if (regArr.includes(part.toLowerCase()))
      return (
        <span className="highlight-black" key={index}>
          {part}
        </span>
      );
    else if (part.toLowerCase() === ". \n") {
      return (
        <>
          .<br />
          {" \n"}
        </>
      );
    } else return part;
  });
};
export const highlightedCheckedText = (text, compliteCrit = []) => {
  const regQ = [`"`];
  const regD = [` - `, ` – `];
  const regS = [`  `];
  // eslint-disable-next-line no-useless-escape
  const nonCyrillicRegex = /[^а-яё0-9\s.,!?;:"()«»=—\-]/gi;
  // const nonCyrillicRegex =
  //   /(?<![а-яёА-ЯЁ])[^\s.,!?;:"()«»—–0-9\-+=/*@#$%^&()[\]{}<>\\|~`']/gi;
  const nonCyrillicMatches = text.match(nonCyrillicRegex);
  const uniqueNonCyrillic = nonCyrillicMatches
    ? [...new Set(nonCyrillicMatches)]
    : [];

  const regexPattern = new RegExp(
    `(${[...compliteCrit, ...regQ, ...regD, ...regS, ...uniqueNonCyrillic].join(
      "|"
    )})`,
    "gi"
  );
  // Split the text by "example", keeping the word itself
  const parts = text.split(regexPattern); // Split the text by "example", keeping the word itself
  return parts.map((part, index) => {
    if (regQ.includes(part.toLowerCase()))
      return (
        <span className="highlight-red" key={index}>
          {part}
        </span>
      );
    else if (
      compliteCrit.includes(part) ||
      compliteCrit.includes(part.toLowerCase())
    )
      return (
        <span className="highlight-orange" key={index}>
          {part}
        </span>
      );
    else if (regD.includes(part.toLowerCase()))
      return (
        <span className="highlight-green" key={index}>
          {part}
        </span>
      );
    else if (regS.includes(part.toLowerCase()))
      return (
        <span className="highlight-yellow" key={index}>
          {part}
        </span>
      );
    else if (uniqueNonCyrillic.includes(part))
      return (
        <span className="highlight-purple" key={index}>
          {part}
        </span>
      );
    else if (
      part.toLowerCase().includes(`-`) ||
      part.toLowerCase().includes(`–`) ||
      part.toLowerCase().includes(`—`)
    )
      return (
        <span className="highlight-dash" key={index}>
          {part}
        </span>
      );
    else if (part.toLowerCase() === ". \n") {
      return (
        <>
          .<br />
          {" \n"}
        </>
      );
    } else return part;
  });
};
const wordCaps = (text) =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
export const voiceToEdit = (
  val,
  handleTxt,
  setHandleTxt,
  fieldId = "editArea"
) => {
  const newVal = val.en;
  let start = handleTxt.length;
  let end = handleTxt.length;
  let textarea = null;

  textarea = document.getElementById(fieldId);
  if (textarea !== null) {
    start = textarea.selectionStart;
    end = textarea.selectionEnd;
  }

  if (start === end) {
    // No text selected
    const textBefore = handleTxt.slice(0, start);
    const textAfter = handleTxt.slice(end);
    const lastSymb = textBefore[textBefore.length - 1];
    const newText =
      textBefore +
      (lastSymb === "." || textarea === null ? " " : "") +
      newVal +
      " " +
      textAfter;
    setHandleTxt(newText);
    return;
  }

  const textBefore = handleTxt.slice(0, start);
  const textAfter = handleTxt.slice(end);
  const newText = textBefore + " " + newVal + " " + textAfter;

  setHandleTxt(newText);

  // Maintain the cursor position after replacement
  setTimeout(() => {
    textarea.setSelectionRange(start, start + newVal.length);
  }, 0);
};

const quoteEachLine = (input) => {
  return input
    .split("\n") // Разбиваем на строки
    .map((line) => `"${line}"`) // Оборачиваем каждую строку в кавычки
    .join("\n"); // Собираем обратно в строку
};
const quoteEachLineI = (input, txt = " instead of ") => {
  const lines = input.split("\n").filter(Boolean); // убираем пустые строки
  const result = [];

  for (let i = 0; i < lines.length; i += 2) {
    const first = lines[i]?.trim() || "";
    const second = lines[i + 1]?.trim() || "";
    result.push(`"${first}"${txt}"${second}";`);
  }

  return result.join("\n");
};
export const editTextAction = (
  fieldId,
  text,
  setText,
  action,
  ignoreNoselected = false,
  newVal = null,
  finalFn = null
) => {
  const textarea = document.getElementById(fieldId);
  if (!textarea && !text) return "";
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end && !ignoreNoselected) {
    return; // No text selected
  }

  if (action === "delSel") {
    const newText = text.slice(0, start) + text.slice(end);
    setText(newText);
    if (textarea !== null) textarea.setSelectionRange(start, start);
    return;
  }

  const textF = text ? text : textarea.value;
  const selectedText = textF.slice(start, end);

  let resultText = "";

  if (action === "add") {
    resultText = newVal || "";
  } else if (action === "upFirst") {
    resultText = wordCaps(selectedText);
  } else if (action === "down")
    // resultText = selectedText.replace(/\b\w/g, (char) => char.toLowerCase());
    resultText = selectedText.toLowerCase();
  else if (action === "up") resultText = selectedText.toUpperCase();
  else if (action === "accent")
    resultText = `"${selectedText}" instead of "${selectedText}"`;
  else if (action === "quotation") resultText = `"${selectedText}"`;
  else if (action === "quotation2") resultText = `«${selectedText}»`;
  else if (action === "quotationL") resultText = quoteEachLine(selectedText);
  else if (action === "quotationLI") resultText = quoteEachLineI(selectedText);
  else if (action === "quotationLB")
    resultText = quoteEachLineI(selectedText, ": it is better to use ");
  else if (action === "staples") resultText = `(${selectedText})`;
  else if (action === "dash") resultText = ` — ${selectedText}`;
  else if (action === "quotation3") resultText = replaceQuotes3(selectedText);
  const newText = textF.slice(0, start) + " " + resultText + textF.slice(end);

  setText(newText);
  if (textarea !== null)
    textarea.setSelectionRange(start, start + resultText.length + 1);
};
export const editTextActionRef = (
  ref,
  text,
  setText,
  action,
  ignoreNoselected = false,
  newVal = null
) => {
  if (!ref || !ref.current) return;
  const textarea = ref.current;
  // const textarea = document.getElementById("R1");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end && !ignoreNoselected) {
    return; // No text selected
  }

  if (action === "delSel") {
    const newText = text.slice(0, start) + text.slice(end);
    setText(newText);
    if (textarea !== null) textarea.setSelectionRange(start, start);
    return;
  }
  const selectedText = text.slice(start, end);

  let resultText = "";

  if (action === "add") {
    resultText = newVal || "";
  } else if (action === "upFirst") {
    resultText = wordCaps(selectedText);
  } else if (action === "down")
    // resultText = selectedText.replace(/\b\w/g, (char) => char.toLowerCase());
    resultText = selectedText.toLowerCase();
  else if (action === "up") resultText = selectedText.toUpperCase();
  else if (action === "accent")
    resultText = `"${selectedText}" instead of "${selectedText}"`;
  else if (action === "quotation") resultText = `"${selectedText}"`;
  else if (action === "quotation2") resultText = `«${selectedText}»`;
  else if (action === "staples") resultText = `(${selectedText})`;
  else if (action === "dash") resultText = ` — ${selectedText}`;
  const newText =
    text.slice(0, start) +
    (start === 0 ? "" : " ") +
    resultText +
    text.slice(end);

  setText(newText);
  if (textarea !== null)
    textarea.setSelectionRange(start, start + resultText.length + 1);
};
export const replaceText = (fieldId, handleTxt, oldText, newVal) => {
  const textarea = document.getElementById(fieldId);
  let start = 0;
  let end = 0;
  let isSelected = false;
  if (textarea) {
    start = textarea.selectionStart;
    end = textarea.selectionEnd;
    isSelected = start !== end;
  }

  if (isSelected) {
    // only selection
    const textBefore = handleTxt.slice(0, start);
    const selectedText = handleTxt.slice(start, end);
    const newSelectedText = selectedText.replace(
      new RegExp(oldText, "g"),
      newVal
    );
    const textAfter = handleTxt.slice(end);
    const newText = textBefore + " " + newSelectedText + " " + textAfter;
    return newText;

    // return str.replace(selectedText, newText);
  } else {
    if (!handleTxt) return "";
    // all
    return handleTxt.replace(new RegExp(oldText, "g"), newVal);
  }
  // return str.replace(oldText, newText);
};
export const splitString = (input) => {
  // const regex = /R1(.*?)R2(.*?)R3(.*?)R0(.*)/s; // регулярное выражение для разделения на три части
  const regex = /R1:(.*?)R2:(.*?)R3:(.*?)R0:(.*)/s; // регулярное выражение для разделения на три части
  const match = input.match(regex); // ищем совпадения

  if (match) {
    return {
      R1: match[1].trim(),
      R2: match[2].trim(),
      R3: match[3].trim(),
      R0: match[4].trim(),
      // R0: match[4].trim(),
    };
  } else {
    return { R1: "", R2: "", R3: input, R0: "" };
  }
};
export const fromJsonString = (jsonString) => {
  try {
    const newObj = JSON.parse(jsonString);
    return newObj;
  } catch (error) {
    return { ...defaultDim };
  }
};
export const baseRespName = {
  "INT": {
    R1: "Interaction 1",
    R2: "Interaction 1",
    fn: replaceWordsInteractions,
  },
  "@R": { R1: "@Response 1", R2: "@Response 1", fn: replaceNum },
  "RAB": { R1: "Response A", R2: "Response B", fn: replaceWords },
  "R12": { R1: "Response 1", R2: "Response 2", fn: replaceNum2 },
};

export const concatenateEnFields = (justification) => {
  if (!justification.length) return "";
  return justification
    .map((obj) => obj.en)
    .reduce((acc, val) => {
      if (val === "." || val === ",") {
        return acc + val;
      }
      let formatVal = acc.endsWith(".")
        ? val.charAt(0).toUpperCase() + val.slice(1)
        : val;
      formatVal = formatVal.replace("respond ", "Respond ");
      if (!acc)
        formatVal = formatVal.charAt(0).toUpperCase() + formatVal.slice(1);
      return acc + " " + formatVal;
    }, "")
    .trim();
};

export const applyAction = (newFr_, action = "") => {
  if (!action) return newFr_;
  const newVal = baseRespName[action].fn(newFr_);
  return newVal;
};

export const replaceEndings1 = (str, replacements) => {
  for (const [oldEnding, newEnding] of replacements) {
    if (str.endsWith(oldEnding)) {
      return str.slice(0, -oldEnding.length) + newEnding;
    }
  }
  return str;
};
export const addinside = (ref, str, setVal = null) => {
  const cursorPos = ref.current.selectionStart;
  const text = ref.current.value;
  const newVal = text.slice(0, cursorPos) + str + text.slice(cursorPos);
  if (setVal === null) return newVal;
  setVal(newVal);
  ref.current.selectionStart = ref.current.selectionEnd =
    cursorPos + str.length;
};
export const replaceEndings = (e, replacements) => {
  const str = e.target.value;
  const cursorPos = e.target.selectionStart;
  let curs = e.target.selectionStart;

  const beforeCursor = str.slice(0, cursorPos);
  const afterCursor = str.slice(cursorPos);

  const matchBefore = beforeCursor.match(/(\S+)$/);
  const matchAfter = afterCursor.match(/^(\S*)/);

  if (matchBefore && matchAfter) {
    const word = matchBefore[0] + matchAfter[0];
    const ll = word.length;
    if (ll < 2 || ll > 4) return { curs: null, val: str };
    for (const [oldEndings, newEnding] of replacements) {
      if (oldEndings.some((ending) => word === ending)) {
        const newWord = word.slice(0, -ll) + newEnding;
        curs = curs - ll + newWord.length;

        return {
          curs: curs,
          val:
            beforeCursor.slice(0, beforeCursor.length - matchBefore[0].length) +
            newWord +
            afterCursor.slice(matchAfter[0].length),
        };
      }
    }
  }

  return { curs: null, val: str };
};

export const countQuote = (str) => {
  let quoteCount = 0;

  for (let char of str) {
    if (char === '"') {
      quoteCount++;
    }
  }
  return quoteCount;
};

export const checkPatternR = (text) => {
  const pattern = /^R1:.*R2:.*R3:.*R0:.*$/s;
  return !pattern.test(text);
};

export const getNameByAorB = (value, set) => {
  const item = defaultDimSets[set].find(
    (obj) => obj.a === value || obj.b === value
  );
  return item ? item.name : ""; // Возвращает поле name или null, если не найдено
};

export const replaceQuotes = (txt) => {
  if (!txt) return "";
  let isOpening = true;
  let newVal = txt.replace(/"/g, () => {
    if (isOpening) {
      isOpening = false;
      return "«";
    } else {
      isOpening = true;
      return "»";
    }
  });
  newVal = newVal.replace(/“/g, "«");
  newVal = newVal.replace(/”/g, "»");
  return newVal;
};
export const replaceQuotes4 = (txt) => {
  if (!txt) return "";
  const newVal = txt.replace(/[“«”»]/g, `"`);

  return newVal;
};
export const toOrder = (fieldid, val, type = "") => {
  if (!val) return "";
  let txt = cleanAndCapitalize(val);
  txt = replaceText(fieldid, txt, "-", "—");
  if (type === "") txt = replaceQuotes3(txt);
  if (type === "«»") txt = replaceQuotes(txt);
  if (type === `""`) txt = replaceQuotes4(txt);
  txt = txt.replace("russian", "Russian");
  return txt;
};
export const actionWithSelection = (fieldid, callback) => {
  const textarea = document.getElementById(fieldid);
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const text = textarea.value;
  const selectedText = start === end ? text : text.slice(start, end); // No text selected — all text
  let resultText = callback(selectedText);
  return start === end
    ? resultText
    : text.slice(0, start) + " " + resultText + text.slice(end);
};

export const processStars = (fieldid) => {
  const callback = (text) => {
    // 1. Заменяем все *** на * **
    let updated = text.replace(/\*\*\*/g, "* **");
    // 2. Ищем все фрагменты между **...**, учитывая, что они могут появиться после шага 1
    updated = updated.replace(/\*\*(.*?)\*\*/g, (_, inner) => {
      const trimmed = inner.trim(); // убираем пробелы в начале и конце
      return `**${trimmed}**`;
    });
    return updated;
  };
  return actionWithSelection(fieldid, callback);
};
export const cleanDotSpacesInBracketsOld = (text) => {
  return text
    .replace(/\\\s+\[/g, "\\[") // заменяем \ [ на \[
    .replace(/\\\[(.*?)\\\]/gs, (match, inner) => {
      // const cleaned = inner.replace(/\\\ +/g, "\\"); // убираем пробелы после \.

      const cleaned = inner
        .replace(/(\\) +/g, "$1") // убираем пробелы после \.
        .replace(/\\Times/g, "\\times") // заменяем \Times на \times
        .replace(/\\раз/g, "\\times") // заменяем \раз на \times
        .replace(/(?<=\d) (?=\d)/g, ""); // удаляем пробелы между цифрами
      return `\\[${cleaned}\\]`;
    });
};
const latexRepl = (txt) => {
  const txtN = txt
    .replace(/(\\) +/g, "$1") // убираем пробелы после \.
    .replace(/\\Times/g, "\\times") // заменяем \Times на \times
    .replace(/\\Text/g, "\\text") // заменяем \Times на \times
    .replace(/\\End/g, "\\end") // заменяем \Times на \times
    .replace(/\\Quad/g, "\\quad") // заменяем \Times на \times
    .replace(/\\fracc/g, "\\frac") // заменяем \Times на \times
    .replace(/\\absx/g, "\\approx") // заменяем \Times на \times
    .replace(/\\раз/g, "\\times") // заменяем \раз на \times
    .replace(/(?<=\d) (?=\d)/g, ""); // удаляем пробелы между цифрами
  return txtN;
};
export const cleanDotSpacesInBrackets = (fieldid) => {
  const formating = (txt) =>
    txt
      .replace(/\\\s+\[/g, "\\[") // заменяем \ [ на \[s
      .replace(/\\\[(.*?)\\\]/gs, (match, inner) => {
        const cleaned = latexRepl(inner);
        return `\\[${cleaned}\\]`;
      });
  const nv = actionWithSelection(fieldid, formating);
  return nv;
};
export const cleanDotSpacesInDol = (fieldid) => {
  const formating = (txt) =>
    txt.replace(/\$\$(.*?)\$\$/gs, (match, inner) => {
      const trimmed = inner.trim(); // удаляем пробелы по краям содержимого
      const cleaned = latexRepl(trimmed);
      return `$$${cleaned}$$`;
    });

  const nv = actionWithSelection(fieldid, formating);
  return nv;
};
export const cleanSpacesInNumbers = (fieldid) => {
  const formating = (txt) => txt.replace(/(?<=\d) (?=\d)/g, ""); // удаляем пробелы между цифрами

  const nv = actionWithSelection(fieldid, formating);
  return nv;
};
export const replaceDotsInNumbers = (fieldid) => {
  const formating = (txt) => txt.replace(/(?<=\d)\.(?=\d)/g, ","); // заменяем точки между цифрами на запятые

  const nv = actionWithSelection(fieldid, formating);
  return nv;
};
export const changeUsd = (fieldid) => {
  const formating = (txt) =>
    txt.replace(/долл\./g, "долларов").replace(/USD/g, "долларов США"); // заменяем \Times на \times
  const nv = actionWithSelection(fieldid, formating);
  return nv;
};

export const findAndReplace = (fieldid, find, repl) => {
  const formating = (txt) => txt.replaceAll(find, repl);

  const nv = actionWithSelection(fieldid, formating);
  return nv;
};

export const baseFormatChanges = {
  "Markdown": {
    fn: processStars,
    name: "markdowns",
  },
  "LatexF": {
    fn: cleanDotSpacesInBrackets,
    name: "latex function",
  },
  "LatexА2": {
    fn: cleanDotSpacesInDol,
    name: "latex function $$",
  },
  "SpacesNum": {
    fn: cleanSpacesInNumbers,
    name: "Numbers: delete spaces",
  },
  "DotsNum": {
    fn: replaceDotsInNumbers,
    name: "Numbers: dots to commas",
  },
  "DelUSD": {
    fn: changeUsd,
    name: "delete USD",
  },
};

export const getRefSelection = (textRef) => {
  const textarea = textRef.current;
  if (!textarea) return "";

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end) return ""; //
  return textarea.value.slice(start, end).trim();
};
