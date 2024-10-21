import {
  replacementsGeneral,
  replacementsInteractions,
  replacementsPunctuation,
  replacementsResponses,
  replacementsResponsesNum,
} from "../constants/replacements";
const escapeSpecialCharacters = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

export async function copyFromTextarea() {
  const textarea = document.getElementById("edit");

  textarea.select();
  try {
    document.execCommand("copy");
    console.log("Текст успешно скопирован в буфер обмена");
  } catch (err) {
    console.error("Не удалось скопировать текст: ", err);
  }
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
const sentencesCaps = (text) => {
  // Splitting the text into sentences
  let sentences = text.split(/([.!?]\s*)/);
  // We go through each sentence and make the first letter capital
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].length > 0) {
      sentences[i] =
        sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
    }
  }
  // Putting the sentences back into the text
  return sentences.join("");
};

export const cleanAndCapitalize = (text) => {
  // text = text.replace(/\s+/g, " ").trim();
  text = text.trim();
  text = text.replace(/ +/g, " ").replace(/ ?\n ?/g, "\n");
  text = text.replace(/\.\./g, ".");
  text = text.replace(/\s\./g, ".");
  text = text.replace(/\s:/g, ":");
  text = text.replace(/\s,/g, ",");
  //  links
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let parts = text.split(/(\n+|https?:\/\/[^\s]+)/g);
  // capitalise all exept links
  parts = parts.map((part, index) => {
    if (urlRegex.test(part) || part.startsWith("\n")) {
      // a link or new line
      return part;
    } else {
      // not a link
      part = part.toLowerCase();
      part = sentencesCaps(part);
      return part;
    }
  });

  // combine
  text = parts.join("");
  // text = text.toLowerCase();
  // text = sentencesCaps(text);

  if (!/[.,:!?]$/.test(text.trim()) && text.split(" ").length > 2) {
    return text.trim() + ".";
  }

  return text;
};

const replaceByArr = (replacementsArr, text) => {
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
  const regD = [`-`, `–`];
  const regS = [`  `];

  const regexPattern = new RegExp(
    `(${[...compliteCrit, ...regQ, ...regD, ...regS].join("|")})`,
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
  const newText = text.slice(0, start) + " " + resultText + text.slice(end);

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
  const newText = text.slice(0, start) + " " + resultText + text.slice(end);

  setText(newText);
  if (textarea !== null)
    textarea.setSelectionRange(start, start + resultText.length + 1);
};
export const replaceText = (fieldId, handleTxt, oldText, newVal) => {
  const textarea = document.getElementById(fieldId);
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const isSelected = start !== end;

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
    // all
    return handleTxt.replace(new RegExp(oldText, "g"), newVal);
  }
  // return str.replace(oldText, newText);
};
export const splitString = (input) => {
  // const regex = /R1(.*?)R2(.*?)R3(.*?)R0(.*)/s; // регулярное выражение для разделения на три части
  const regex = /R0(.*?)R1(.*?)R2(.*?)R3(.*)/s; // регулярное выражение для разделения на три части
  const match = input.match(regex); // ищем совпадения

  if (match) {
    return {
      R0: match[1].trim(),
      R1: match[2].trim(),
      R2: match[3].trim(),
      R3: match[4].trim(),
      // R0: match[4].trim(),
    };
  } else {
    return { R1: "", R2: "", R3: input, R0: "" };
  }
};
