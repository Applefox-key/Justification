export const concatenateEnFields = (justification) => {
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
