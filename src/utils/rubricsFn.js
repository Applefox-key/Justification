import { defaultRubJust, defaultRubricator } from "../constants/textParts";
import { summariseRub } from "./analysis";
import { saveToHistory } from "./localStorage";
import { applyAction } from "./utilStr";

export const createFieldFn = (
  item,
  setItem,
  textRef,
  setTextRef,
  action,
  fieldId,
  setPopup
) => {
  const fieldFn = {
    delRub: (index) => {
      if (!window.confirm("Delete criraria # " + (index + 1))) return;
      setItem((prev) => {
        return {
          ...prev,
          rubricator: prev.rubricator.filter((it, i) => i !== parseInt(index)),
        };
      });
    },

    move: (ind, dir) => {
      setItem((prev) => {
        const rubricator = [...prev.rubricator];

        // Сдвиг вверх (если элемент первый, он становится последним)
        if (dir === "up") {
          if (ind === 0) {
            rubricator.push(rubricator.shift()); // Переносим первый элемент в конец
          } else {
            // Сдвигаем элемент вверх
            const temp = rubricator[ind];
            rubricator[ind] = rubricator[ind - 1];
            rubricator[ind - 1] = temp;
          }
        }

        // Сдвиг вниз (если элемент последний, он становится первым)
        if (dir === "down") {
          if (ind === rubricator.length - 1) {
            rubricator.unshift(rubricator.pop()); // Переносим последний элемент в начало
          } else {
            // Сдвигаем элемент вниз
            const temp = rubricator[ind];
            rubricator[ind] = rubricator[ind + 1];
            rubricator[ind + 1] = temp;
          }
        }

        return {
          ...prev,
          rubricator,
        };
      });
    },
    getFieldValue: (fieldName = "") => {
      if (!item) return "";
      if (!fieldId && !fieldName) return "";
      const [field, index] = fieldName
        ? fieldName.split("-")
        : fieldId.split("-");

      const dr = { ...defaultRubricator };
      if (field in item) return item[field];

      if (item.rubricator.length > index && field in dr)
        return item.rubricator[index][field];
      else return "";
      // return field in item
      //   ? item[field]
      //   : item.rubricator.length < index
      //   ? ""
      //   : item.rubricator[index][field];

      // return field in defaultRubricator
      //   ? item.rubricator.length >= index
      //     ? ""
      //     : item.rubricator[index][field]
      //   : item[field];
    },
    setNewValRub: (val, fieldName = "") => {
      const [field, index] = fieldName
        ? fieldName.split("-")
        : fieldId.split("-");
      if (field in defaultRubricator)
        setItem((prev) => {
          return {
            ...prev,
            rubricator: prev.rubricator.map((it, i) =>
              i === parseInt(index) ? { ...it, [field]: val } : it
            ),
          };
        });
      else setItem({ ...item, [field]: val });
    },
    createRub: (type = "") => {
      if (type) {
        let nr;
        if (type === "punct")
          nr = {
            rubric: "Ответ использует правильную пунктуацию",
            example: `использует кавычки вида «» вместо "".`,
          };
        if (type === "upperCA")
          nr = {
            rubric: "Ответ оформлен без орфографических ошибок",
            example: `использует строчную букву вместо заглавной после двоеточия согласно правилам русского языка`,
          };
        if (type === "fluency")
          nr = {
            rubric:
              "Ответ использует фразы естественно звучащие в русском языке",
            example: `«» вместо «».`,
          };
        if (type === "foreign")
          nr = {
            rubric:
              "Ответ написан на русском языке, не используя иностранные слова без необходимости",
            example: `«» вместо «».`,
          };
        if (type === "gender")
          nr = {
            rubric: "Ответ в использует гендерно-нейтральные формулировки.",
            example: `«(а)» вместо «».`,
          };
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [
              ...prev.rubricator,
              {
                ...defaultRubricator,
                ...nr,
              },
            ],
          };
        });
      } else
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [
              ...prev.rubricator,
              { ...defaultRubricator, new: true },
            ],
          };
        });
    },
    deleteRub: () => {
      if (window.confirm("Clear rubrics?"))
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [],
          };
        });
    },
    updateRub: (nv) => {
      if (window.confirm("update rubrics?"))
        setItem((prev) => {
          return {
            ...prev,
            rubricator: nv,
          };
        });
    },
    createRubPrompt: (selectedText, notAutoText = false) => {
      const rubrArr = selectedText
        .split("\n")
        .filter(Boolean)
        .map((el) => {
          const [r, ex] = el.split("==");
          return {
            ...defaultRubricator,
            rubric: (notAutoText ? "" : "Ответ содержит ") + r,
            example: ex,
          };
        });

      setItem((prev) => {
        return {
          ...prev,
          rubricator: [...prev.rubricator, ...rubrArr],
        };
      });
    },
    onFocus: (ref) => {
      if (textRef && textRef.current) {
        const field = fieldId;
        const val = textRef.current.value || "";
        fieldFn.setNewValRub(val, field);
      }
      setTextRef(ref);
    },
    onKeyDown: (e) => {
      if (e.key === "F2") {
        const val = fieldFn.getFieldValue(fieldId);
        const newVal = applyAction(val, action);
        fieldFn.setNewValRub(newVal);
      }
    },
    notNew: (index) => {
      setItem((prev) => {
        return {
          ...prev,
          rubricator: prev.rubricator.map((it, i) =>
            i === parseInt(index)
              ? (() => {
                  const { new: _, ...rest } = it;
                  return rest;
                })()
              : it
          ),
        };
      });
    },
    summ: (i = null, ovr = false) => {
      if (i && typeof i.preventDefault === "function") {
        i.preventDefault();
        i = null;
      }
      const newV = summariseRub(item, i, ovr);
      setItem({ ...newV });
    },
    clearAll: () => {
      if (window.confirm("Clear task?"))
        saveToHistory({ en: JSON.stringify(item), ru: "RUB" });
      setPopup("info has been added to the history");
      setItem(defaultRubJust);
    },
    addLinkToRub: (linkObj) => {
      // linkObj { name: "...", link: "..." }
      if (linkObj && linkObj.name && linkObj.link) {
        setItem((prev) => {
          return {
            ...prev,
            links: [...prev.links, { ...linkObj }],
          };
        });
      }
    },
    delLink: (index) => {
      if (index >= 0 && index < item.links.length) {
        if (!window.confirm("Delete link # " + (index + 1))) return;
        setItem((prev) => {
          return {
            ...prev,
            links: prev.links.filter((it, i) => i !== parseInt(index)),
          };
        });
      }
    },
    updateLinks: (val, index) => {
      setItem((prev) => {
        return {
          ...prev,
          links: prev.links.map((it, i) =>
            i === parseInt(index) ? { ...it, ...val } : it
          ),
        };
      });
    },
  };
  return fieldFn;
};
// const fieldFn = {
//   delRub: (index) => {
//     if (!window.confirm("Delete criraria # " + (index + 1))) return;
//     setItem((prev) => {
//       return {
//         ...prev,
//         rubricator: prev.rubricator.filter((it, i) => i !== parseInt(index)),
//       };
//     });
//   },
//   move: (ind, dir) => {
//     setItem((prev) => {
//       const rubricator = [...prev.rubricator];

//       // Сдвиг вверх (если элемент первый, он становится последним)
//       if (dir === "up") {
//         if (ind === 0) {
//           rubricator.push(rubricator.shift()); // Переносим первый элемент в конец
//         } else {
//           // Сдвигаем элемент вверх
//           const temp = rubricator[ind];
//           rubricator[ind] = rubricator[ind - 1];
//           rubricator[ind - 1] = temp;
//         }
//       }

//       // Сдвиг вниз (если элемент последний, он становится первым)
//       if (dir === "down") {
//         if (ind === rubricator.length - 1) {
//           rubricator.unshift(rubricator.pop()); // Переносим последний элемент в начало
//         } else {
//           // Сдвигаем элемент вниз
//           const temp = rubricator[ind];
//           rubricator[ind] = rubricator[ind + 1];
//           rubricator[ind + 1] = temp;
//         }
//       }

//       return {
//         ...prev,
//         rubricator,
//       };
//     });
//   },
//   getFieldValue: (fieldName = "") => {
//     if (!item) return "";
//     if (!fieldId && !fieldName) return "";
//     const [field, index] = fieldName
//       ? fieldName.split("-")
//       : fieldId.split("-");

//     const dr = { ...defaultRubricator };
//     if (field in item) return item[field];
//     if (item.rubricator.length > index && field in dr)
//       return item.rubricator[index][field];
//     else return "";
//     // return field in item
//     //   ? item[field]
//     //   : item.rubricator.length < index
//     //   ? ""
//     //   : item.rubricator[index][field];

//     // return field in defaultRubricator
//     //   ? item.rubricator.length >= index
//     //     ? ""
//     //     : item.rubricator[index][field]
//     //   : item[field];
//   },
//   setNewValRub: (val, fieldName = "") => {
//     const [field, index] = fieldName
//       ? fieldName.split("-")
//       : fieldId.split("-");
//     if (field in defaultRubricator)
//       setItem((prev) => {
//         return {
//           ...prev,
//           rubricator: prev.rubricator.map((it, i) =>
//             i === parseInt(index) ? { ...it, [field]: val } : it
//           ),
//         };
//       });
//     else setItem({ ...item, [field]: val });
//   },
//   createRub: (type = "") => {
//     if (type) {
//       let nr;
//       if (type === "punct")
//         nr = {
//           rubric: "Ответ использует правильную пунктуацию",
//           example: `использует кавычки вида «» вместо "".`,
//         };
//       if (type === "upperCA")
//         nr = {
//           rubric: "Ответ оформлен без орфографических ошибок",
//           example: `использует строчную букву вместо заглавной после двоеточия`,
//         };
//       if (type === "fluency")
//         nr = {
//           rubric:
//             "Ответ использует фразы естественно звучащие в русском языке",
//           example: `использует "" вместо "".`,
//         };
//       setItem((prev) => {
//         return {
//           ...prev,
//           rubricator: [
//             ...prev.rubricator,
//             {
//               ...defaultRubricator,
//               ...nr,
//             },
//           ],
//         };
//       });
//     } else
//       setItem((prev) => {
//         return {
//           ...prev,
//           rubricator: [
//             ...prev.rubricator,
//             { ...defaultRubricator, new: true },
//           ],
//         };
//       });
//   },
//   onFocus: (ref) => {
//     if (textRef && textRef.current) {
//       const field = fieldId;
//       const val = textRef.current.value || "";
//       fieldFn.setNewValRub(val, field);
//     }
//     setTextRef(ref);
//   },
//   onKeyDown: (e) => {
//     if (e.key === "F2") {
//       const val = item[fieldId];
//       const newVal = applyAction(val, action);
//       fieldFn.setNewValRub(newVal);
//     }
//   },
//   notNew: (index) => {
//     setItem((prev) => {
//       return {
//         ...prev,
//         rubricator: prev.rubricator.map((it, i) =>
//           i === parseInt(index)
//             ? (() => {
//                 const { new: _, ...rest } = it;
//                 return rest;
//               })()
//             : it
//         ),
//       };
//     });
//   },
//   summ: (i = null) => {
//     if (i && typeof i.preventDefault === "function") {
//       i.preventDefault();
//       i = null;
//     }
//     const newV = summariseRub(item, i);
//     setItem({ ...newV });
//   },
//   clearAll: () => {
//     if (window.confirm("Clear task?"))
//       saveToHistory({ en: JSON.stringify(item), ru: "RUB" });
//     setPopup("info has been added to the history");
//     setItem(defaultRubJust);
//   },
// };
