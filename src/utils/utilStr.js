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
// export const concatenateEnFields = (justification) => {
//     return justification
//       .map((obj) => obj.en)
//       .reduce((acc, val) => {
//         if (val === "." || val === ",") {
//           return acc + val;
//         }
//         return acc + " " + val;
//       }, "")
//       .trim();
//   };
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

// (![] + //false
//   [] + //true
//   ([] + {})[ //[object Object]
//     (![] + ([] + {}))[+!+[] + [+[]]] +
//       ([] + {})[+!+[]] +
//       ([][[]] + [])[+!+[]] +
//       (![] + [])[!+[] + !+[] + !+[]] +
//       (!+[] + [])[+[]] +
//       (!+![] + [])[+!+[]] +
//       ([][[]] + [])[+[]] +
//       (![] + ([] + {}))[+!+[] + [+[]]] +
//       (!+[] + [])[+[]] +
//       ([] + {})[+!+[]] +
//       (!+![] + [])[+!+[]]
//   ])[+!+[] + !+[] + !+[] + [+[]]] +
//   (!+![] + [])[+!+[] + !+[] + !+[]] +
//   (!+![] + [])[+!+[]] +
//   ([] + {})[+!+[] + !+[]] +
//   ([![]] + [][[]])[+!+[] + [+[]]] +
//   (![] + [])[!+[] + !+[]] +
//   ([] + {})[+!+[]];
export const cleanAndCapitalize = (text) => {
  // Убираем лишние пробелы
  text = text.replace(/\s+/g, " ").trim();

  // Исправляем ошибку в слове "respons" и делаем первую букву заглавной
  text = text.replace(/\brespons\b/gi, "Response");
  text = text.replace(/\bresponse\b/gi, "Response");

  // Разбиваем текст на предложения
  let sentences = text.split(/([.!?]\s*)/);

  // Проходим по каждому предложению и делаем первую букву заглавной
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].length > 0) {
      sentences[i] =
        sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
    }
  }

  // Собираем предложения обратно в текст
  return sentences.join("");
};

export const replaceWords = (allJust) => {
  const replacements = [
    {
      oldT: ["the answer one", "the answer 1", "answer one", "answer 1"],
      newT: "Response A",
      caseSensitive: false,
    },
    {
      oldT: ["the answer two", "the answer 2", "answer two", "answer 2"],
      newT: "Response B",
      caseSensitive: false,
    },
    {
      oldT: ["answers"],
      newT: "responses",
      caseSensitive: true,
    },
    {
      oldT: ["respondent "],
      newT: "Response",
      caseSensitive: false,
    },
    {
      oldT: ["Answers"],
      newT: "Responses",
      caseSensitive: true,
    },
  ];
  replacements.forEach(({ oldT, newT, caseSensitive }) => {
    oldT.forEach((oldWord) => {
      // Создаем регулярное выражение с глобальным флагом для поиска всех вхождений
      const flags = caseSensitive ? "g" : "gi";
      const regex = new RegExp(oldWord, flags);
      // Заменяем все вхождения oldWord на newT
      allJust = allJust.replace(regex, newT);
    });
  });
  return allJust;
};
